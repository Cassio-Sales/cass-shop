import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh'
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',

  img: {
    height: '3rem',
    width: 'auto'
  },

  h1: {
    fontSize: '2rem',
    fontWeight: 'bold'
  }
})
