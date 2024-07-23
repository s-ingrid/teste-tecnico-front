import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserFormManager from '../../src/components/UserFormManager.vue'

describe('UserFormManager.vue', () => {
  it('renderiza o formulário com dados iniciais corretos', () => {
    const wrapper = mount(UserFormManager, {
      props: {
        user: {
          first_name: '',
          last_name: '',
          email: ''
        }
      }
    })

    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
  })

  it('renderiza corretamente ao criar usuário', () => {
    const wrapper = mount(UserFormManager, {
      props: {
        user: {
          first_name: '',
          last_name: '',
          email: ''
        }
      }
    })

    expect(wrapper.text()).toContain('Criar usuário')
  })

  it('renderiza corretamente ao editar usuário', () => {
    const wrapper = mount(UserFormManager, {
      props: {
        user: { id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' }
      }
    })

    expect(wrapper.text()).toContain('Editar usuário')

    expect(wrapper.find('input[type="text"][placeholder="Primeiro nome"]').element.value).toBe('John')
    expect(wrapper.find('input[type="text"][placeholder="Último nome"]').element.value).toBe('Doe')
    expect(wrapper.find('input[type="email"]').element.value).toBe('john.doe@example.com')
  })

  it('emite o evento save quando o formulário é enviado', async () => {
    const wrapper = mount(UserFormManager, {
      props: {
        user: {}
      }
    })

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted().save).toBeTruthy()
  })

  it('emite o evento close e limpa campos de entrada quando o modal é fechado', async () => {
    const wrapper = mount(UserFormManager, {
      props: {
        user: { first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' }
      }
    })

    await wrapper.find('button.bg-gray-500').trigger('click')

    expect(wrapper.emitted().close).toBeTruthy()

    await wrapper.setProps({ user: {} })
    expect(wrapper.vm.user).toEqual({})
  })
})