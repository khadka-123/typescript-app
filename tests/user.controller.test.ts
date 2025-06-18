import { describe, it, beforeEach, expect, vi } from 'vitest'
import { registerHandler, loginHandler } from '../src/services/rest/controller/user.controller'
import UserModel from '../src/services/rest/model/user.model'
import httpMocks from 'node-mocks-http'

describe('User Controller', () => {
  beforeEach(() => {
    vi.restoreAllMocks()  
  })

  describe('registerHandler', () => {
    it('successfully registers user', async () => {
      vi.spyOn(UserModel, 'create').mockResolvedValueOnce({
        _id: '123',
        name: 'John',
        email: 'john@x.com'
      } as any)

      const req = httpMocks.createRequest({
        body: { name: 'John', email: 'john@x.com', password: 'pass' }
      })
      const res = httpMocks.createResponse()
      
      await registerHandler(req, res)

      expect(UserModel.create).toHaveBeenCalledWith({
        name: 'John',
        email: 'john@x.com',
        password: 'pass'
      })
      expect(res.statusCode).toBe(201)
      expect(res._getRenderView()).toBe('login')
    })

    it('handles database errors', async () => {
      vi.spyOn(UserModel, 'create').mockRejectedValueOnce(new Error('DB error'))

      const req = httpMocks.createRequest({
        body: { name: 'John', email: 'john@x.com', password: 'pass' }
      })
      const res = httpMocks.createResponse()
      
      await registerHandler(req, res)

      expect(res.statusCode).toBe(500)
      expect(res._getRenderView()).toBe('register')
      expect(res._getRenderData().message).toBeInstanceOf(Error)
    })
  })

  describe('loginHandler', () => {
    it('logs in with valid credentials', async () => {
      vi.spyOn(UserModel, 'findOne').mockResolvedValueOnce({
        _id: '123',
        name: 'Jane',
        email: 'jane@x.com'
      } as any)

      const req = httpMocks.createRequest({
        body: { email: 'jane@x.com', password: 'correct' }
      })
      const res = httpMocks.createResponse()
      
      await loginHandler(req, res)

      expect(UserModel.findOne).toHaveBeenCalledWith({
        email: 'jane@x.com',
        password: 'correct'
      })
      expect(res.statusCode).toBe(200)
      expect(res._getRenderView()).toBe('home')
      expect(res._getRenderData().user).toEqual({
        _id: '123',
        name: 'Jane',
        email: 'jane@x.com'
      })
    })

    it('rejects invalid credentials', async () => {
      vi.spyOn(UserModel, 'findOne').mockResolvedValueOnce(null)

      const req = httpMocks.createRequest({
        body: { email: 'wrong@x.com', password: 'incorrect' }
      })
      const res = httpMocks.createResponse()
      
      await loginHandler(req, res)

      expect(res.statusCode).toBe(401)
      expect(res._getRenderView()).toBe('login')
      expect(res._getRenderData().error).toBe('Invalid username or password')
    })

    it('handles query errors', async () => {
      vi.spyOn(UserModel, 'findOne').mockRejectedValueOnce(new Error('Query failed'))

      const req = httpMocks.createRequest({
        body: { email: 'test@x.com', password: 'pass' }
      })
      const res = httpMocks.createResponse()
      
      await loginHandler(req, res)

      expect(res.statusCode).toBe(500)
      expect(res._getRenderView()).toBe('login')
      expect(res._getRenderData().error).toBeInstanceOf(Error)
    })
  })
})