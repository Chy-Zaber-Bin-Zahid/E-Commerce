const { paymentDetails } = require('../../src/controllers/paymentController');
const Payment = require('../../src/models/paymentModel');
const Cart = require('../../src/models/cartModel');
const { successResponse } = require('../../src/controllers/responseController');
const sendEmailWithNodeMail = require('../../src/controllers/email');
const createError = require('http-errors');

jest.mock('../../src/models/paymentModel');
jest.mock('../../src/models/cartModel');
jest.mock('../../src/controllers/email');

describe('paymentDetails controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: { id: 'someUserId' },
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        address: '123 Main St',
        telephone: '12345678901',
        comment: 'Some comments',
        delivery: 'standard',
        payment: 'credit_card',
        totalCost: 100,
      },
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should add payment details to the database and send email', async () => {
    // Mocking Cart.find
    Cart.find.mockResolvedValue([
      { title: 'Product 1', productId: '1' },
      { title: 'Product 2', productId: '2' },
    ]);

    // Mocking sendEmailWithNodeMail
    sendEmailWithNodeMail.mockResolvedValue();

    // Mocking Payment.save
    Payment.prototype.save.mockResolvedValue();

    // Mocking Cart.deleteMany
    Cart.deleteMany.mockResolvedValue();

    await paymentDetails(req, res, next);

    expect(Cart.find).toHaveBeenCalledWith({ userId: 'someUserId' });

    expect(sendEmailWithNodeMail).toHaveBeenCalledWith({
      email: 'john@example.com',
      subject: 'Payment Successfully Done',
      html: expect.stringContaining('Hello John Doe!'),
    });

    expect(Payment.prototype.save).toHaveBeenCalledWith();

    expect(Cart.deleteMany).toHaveBeenCalledWith({ userId: 'someUserId' });

    expect(successResponse).toHaveBeenCalledWith(res, {
      statusCode: 200,
      message: 'payment added to db successfully',
      payload: {
        payment: expect.any(Payment),
      },
    });

    expect(next).not.toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    // Mocking Cart.find to reject the promise
    Cart.find.mockRejectedValue(new Error('Database error'));

    await paymentDetails(req, res, next);

    expect(Cart.find).toHaveBeenCalledWith({ userId: 'someUserId' });

    expect(next).toHaveBeenCalledWith(new createError.InternalServerError('Failed to send mail!'));

    expect(successResponse).not.toHaveBeenCalled();
  });
});
