import Link from 'next/link'
import Container from '@/components/container'

export default function Nav() {
  return (
    <Container className="py-4">
      <nav>
        <div className="flex items-center justify-between">
          <Link href="/orders?page=1">
            Órdenes
          </Link>
          <Link href="/products">
            Productos
          </Link>
        </div>
      </nav>
    </Container>
  )
}
