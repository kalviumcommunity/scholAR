import { render, screen } from '@testing-library/react'
import React from 'react'
import AnswerCard from './AnswerCard'

test('AnswerCard renders final answer and explanation', () => {
  render(<AnswerCard finalAnswer="Yes." explanation="Because reasons." question="Is it?" timestamp="2024-01-01T00:00:00Z" />)
  expect(screen.getByText('Final Answer')).toBeInTheDocument()
  expect(screen.getByText('Yes.')).toBeInTheDocument()
  expect(screen.getByText('Explanation')).toBeInTheDocument()
  expect(screen.getByText('Because reasons.')).toBeInTheDocument()
})


