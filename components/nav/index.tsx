import Link from 'next/link'
import Container from '@/components/container'
import { Text } from '@nextui-org/react'

export default function Nav() {
  return (
    <Container className="py-4">
      <nav>
        <div className="flex items-center justify-between">
          <Link href="/orders?page=1">
            <Text>Órdenes</Text>
          </Link>
          <Link href="/products">
            <Text>Productos</Text>
          </Link>
        </div>
      </nav>
    </Container>
  )
}
