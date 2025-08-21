import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import App from './App'

// Mock fetch
const originalFetch = global.fetch
beforeAll(() => {
  global.fetch = vi.fn(async () => {
    return new Response(JSON.stringify({ finalAnswer: '42', explanation: 'Because math.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }) as any
  }) as any
})

afterAll(() => {
  global.fetch = originalFetch
})

test('API call simulation with loading and final render', async () => {
  render(<App />)
  const textbox = screen.getByLabelText('Your question')
  fireEvent.change(textbox, { target: { value: 'What is life?' } })
  fireEvent.click(screen.getByRole('button', { name: /Ask ScholAR/i }))

  // Loading indicator shows
  expect(screen.getByLabelText('Loading')).toBeInTheDocument()

  // Final answer rendered
  await waitFor(() => expect(screen.getByText('Final Answer')).toBeInTheDocument())
  expect(screen.getByText('42')).toBeInTheDocument()
  expect(screen.getByText('Because math.')).toBeInTheDocument()
})


