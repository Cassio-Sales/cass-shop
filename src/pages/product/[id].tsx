import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails
} from '../../styles/pages/product'
import axios from 'axios'
import { useState } from 'react'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
   const [isCreatingCheckoutSession, setIsCreatingCheckoutSession ] = useState(false)
  
  async function handleBuyButton() {
    try { 
      setIsCreatingCheckoutSession(true);


      const response = await axios.post('/api/checkout', { 
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data;
    
       window.location.href = checkoutUrl 
    } catch (err) {
      //Connect to Sentry 
      setIsCreatingCheckoutSession(false)
      
      alert('Fail to redirect to checkout!')
    }
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button disabled={isCreatingCheckoutSession} onClick={handleBuyButton}>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}


// Build Only 
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_MLH5Wy0Y97hDAC' } }],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params
}) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('en-GB', {
          style: 'currency',
          currency: 'GBP'
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour
  }
}
