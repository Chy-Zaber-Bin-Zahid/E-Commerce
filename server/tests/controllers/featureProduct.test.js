const { featureProduct } = require('../../src/controllers/featureProductController');
const FeatureProduct = require('../../src/models/featureProductModel');
const { successResponse } = require('../../src/controllers/responseController');

jest.mock('../../src/models/featureProductModel');

describe('featureProduct controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      setHeader: jest.fn(),
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should fetch feature products successfully and set headers', async () => {
    const mockProducts = [{ title: 'Product 1' }, { title: 'Product 2' }];
    FeatureProduct.find.mockResolvedValue(mockProducts); // Resolve the promise with mockProducts
  
    await featureProduct(req, res, next);
  
    expect(res.setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    );
    expect(res.setHeader).toHaveBeenCalledWith('Pragma', 'no-cache');
    expect(res.setHeader).toHaveBeenCalledWith('Expires', '0');
  
    expect(successResponse).toHaveBeenCalledWith(res, {
      statusCode: 200,
      message: 'all feature product fetch successfully',
      payload: {
        allProduct: mockProducts,
      },
    });
  
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    const error = new Error('Database error');
    FeatureProduct.find.mockRejectedValue(error);
    await featureProduct(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(successResponse).not.toHaveBeenCalled();
  });
});