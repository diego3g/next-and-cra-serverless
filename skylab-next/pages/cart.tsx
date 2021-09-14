import { GetServerSideProps } from "next"

export default function Cart({ title }) {
  return (
    <h1>{title}</h1>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      title: 'Cart'
    }
  }
}