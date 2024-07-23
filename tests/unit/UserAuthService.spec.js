import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import UserAuthService from '../../src/services/UserAuthService'

const mock = new AxiosMockAdapter(axios)

describe('userLogin', () => {
  it('deve retornar dados do usuário com sucesso', async () => {
    const userData = {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    }

    const responseData = {
      token: 'QpwL5tke4Pnpja7X4',
      user: { id: 1, email: 'eve.holt@reqres.in' },
    }

    mock.onPost('/login').reply(200, responseData)

    const result = await UserAuthService.userLogin(userData)

    expect(result.token).toBe(responseData.token)
    expect(result.email).toEqual(responseData.email)
  })

  it('deve lançar um erro quando a API responde com erro', async () => {
    const userData = {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    }
    const errorMessage = 'Erro ao fazer login'

    mock.onPost('/login').reply(500, { message: errorMessage })

    try {
      await UserAuthService.userLogin(userData)
    } catch (error) {
      expect(error.response?.data?.message).toBe(errorMessage)
      expect(error.response?.status).toBe(500)
    }
  })
})