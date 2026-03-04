import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import CreateNewRow from './CreateNewRow.vue'

describe('CreateNewRow', () => {
  it('toggles the create form visibility', async () => {
    const wrapper = mount(CreateNewRow)

    expect(wrapper.find('.formComponent').exists()).toBe(false)
    expect(wrapper.text()).toContain('Add New Row')

    await wrapper.get('.toggleButton').trigger('click')

    expect(wrapper.find('.formComponent').exists()).toBe(true)
    expect(wrapper.text()).toContain('Close')

    await wrapper.get('.toggleButton').trigger('click')

    expect(wrapper.find('.formComponent').exists()).toBe(false)
    expect(wrapper.text()).toContain('Add New Row')
  })

  it('shows validation errors when required fields are missing', async () => {
    const wrapper = mount(CreateNewRow)

    await wrapper.get('.toggleButton').trigger('click')
    await wrapper.get('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Name is required')
    expect(wrapper.text()).toContain('Radius must be greater than 0')
    expect(wrapper.text()).toContain('Type is required')
    expect(wrapper.emitted('addRow')).toBeUndefined()
  })

  it('emits addRow and resets form after successful submit', async () => {
    const wrapper = mount(CreateNewRow)

    await wrapper.get('.toggleButton').trigger('click')

    await wrapper.get('#parent_id').setValue('parent-123')
    await wrapper.get('#name').setValue('New Item')
    await wrapper.get('#radius').setValue('12')
    await wrapper.get('#bubble').setValue('bubble')

    await wrapper.get('form').trigger('submit.prevent')

    const emitted = wrapper.emitted('addRow')
    expect(emitted).toBeTruthy()
    expect(emitted).toHaveLength(1)
    expect(emitted![0]).toEqual([
      {
        name: 'New Item',
        parent_id: 'parent-123',
        radius: 12,
        type: 'bubble',
      },
    ])

    expect(wrapper.find('.formComponent').exists()).toBe(false)

    await wrapper.get('.toggleButton').trigger('click')

    expect((wrapper.get('#parent_id').element as HTMLInputElement).value).toBe('')
    expect((wrapper.get('#name').element as HTMLInputElement).value).toBe('')
    expect((wrapper.get('#radius').element as HTMLInputElement).value).toBe('0')
    expect((wrapper.get('#bubble').element as HTMLInputElement).checked).toBe(false)
  })
})
