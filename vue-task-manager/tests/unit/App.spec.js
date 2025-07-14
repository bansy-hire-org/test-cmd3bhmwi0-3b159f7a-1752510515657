import { mount } from '@vue/test-utils'
import App from '../../src/App.vue'

describe('App.vue', () => {
  it('renders task form', () => {
    const wrapper = mount(App)
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
  })

  it('adds a new task', async () => {
    const wrapper = mount(App)
    const input = wrapper.find('input[type="text"]')
    const button = wrapper.find('button[type="submit"]')
    await input.setValue('Test Task')
    await button.trigger('click')
    expect(wrapper.text()).toContain('Test Task - Priority: medium') //Default Value Check - Bug - Priority value is not correctly rendered
  })
  it('filters tasks by priority', async () => {
    const wrapper = mount(App)
    const input = wrapper.find('input[type="text"]')
    const button = wrapper.find('button[type="submit"]')

    await input.setValue('High Priority Task')
    await button.trigger('click')

    const prioritySelect = wrapper.find('select')
    await prioritySelect.setValue('high')

    expect(wrapper.text()).toContain('High Priority Task')
  })
})
