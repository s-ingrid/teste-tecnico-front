import { describe, it, expect } from "vitest"
import axios from "axios"
import AxiosMockAdapter from "axios-mock-adapter"
import UserManagerService from "../../src/services/UserManagerService"

const mock = new AxiosMockAdapter(axios)
function getCurrentISODate() {
  return new Date().toISOString()
}

describe("createUser", () => {
  it("deve criar um usuário e retornar os dados do usuário", async () => {
    const userData = {
      email: "george.pascoal@reqres.in",
      first_name: "George",
      last_name: "Pascoal",
    }

    const responseData = {
      createdAt: getCurrentISODate(),
      ...userData,
    }

    mock.onPost("/users").reply(200, responseData)

    const result = await UserManagerService.createUser(userData)

    expect(result.email).toBe(responseData.email)
    expect(result.first_name).toBe(responseData.first_name)
    expect(result.last_name).toBe(responseData.last_name)
  })

  it("deve lançar um erro quando a API responde com erro", async () => {
    const userData = {
      email: "george.pascoal@reqres.in",
      first_name: "George",
      last_name: "Pascoal",
    }
    const errorMessage = "Erro ao criar usuário"

    mock.onPost("/users").reply(500, { message: errorMessage })

    try {
      await UserManagerService.createUser(userData)
    } catch (error) {
      expect(error.response?.data?.message).toBe(errorMessage)
      expect(error.response?.status).toBe(500)
    }
  })
  it("deve atualizar um usuário e retornar os dados do usuário", async () => {
    const userData = {
      email: "george.pascoal@reqres.in",
      first_name: "George",
      id: "118",
      last_name: "Pascoal",
    }

    const responseData = {
      createdAt: new Date().toISOString(),
      ...userData,
    }

    mock.onPost("/users").reply(200, responseData)

    const result = await UserManagerService.updateUser(userData.id, userData)

    expect(result.first_name).toBe(responseData.first_name)
    expect(result.email).toBe(responseData.email)
    expect(result.id).toBe(responseData.id)
    expect(result.last_name).toBe(responseData.last_name)
  })

  it("deve retornar mensagem vazia ao deletar quando a API responde com sucesso e status 204", async () => {
    const userId = "118"
    const responseMessage = ""

    mock.onDelete(`/users/${userId}`).reply(204)

    const result = await UserManagerService.deleteUser(userId)
    console.log(result, "result")

    expect(result).toBe(responseMessage)
  })

  it("deve retornar todos os usuarios da API responde com sucesso", async () => {
    const page = 1
    const responseData = {
      page: 1,
      per_page: 6,
      total: 12,
      total_pages: 2,
      data: [
        {
          id: 1,
          email: "george.bluth@reqres.in",
          first_name: "George",
          last_name: "Bluth",
          avatar: "https://reqres.in/img/faces/1-image.jpg",
        },
        {
          id: 2,
          email: "janet.weaver@reqres.in",
          first_name: "Janet",
          last_name: "Weaver",
          avatar: "https://reqres.in/img/faces/2-image.jpg",
        },
        {
          id: 3,
          email: "emma.wong@reqres.in",
          first_name: "Emma",
          last_name: "Wong",
          avatar: "https://reqres.in/img/faces/3-image.jpg",
        },
        {
          id: 4,
          email: "eve.holt@reqres.in",
          first_name: "Eve",
          last_name: "Holt",
          avatar: "https://reqres.in/img/faces/4-image.jpg",
        },
        {
          id: 5,
          email: "charles.morris@reqres.in",
          first_name: "Charles",
          last_name: "Morris",
          avatar: "https://reqres.in/img/faces/5-image.jpg",
        },
        {
          id: 6,
          email: "tracey.ramos@reqres.in",
          first_name: "Tracey",
          last_name: "Ramos",
          avatar: "https://reqres.in/img/faces/6-image.jpg",
        },
      ],
      support: {
        url: "https://reqres.in/#support-heading",
        text: "To keep ReqRes free, contributions towards server costs are appreciated!",
      },
    }

    mock.onGet(`/users?page=${page}`).reply(200, responseData)

    const result = await UserManagerService.getAllUsers(page)
    console.log(result, "result")

    expect(result).toEqual(responseData)
  })
})
