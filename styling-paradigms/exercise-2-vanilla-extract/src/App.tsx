import Badge from './components/Badge'
import Button from './components/Button'
import Card from './components/Card'

function App() {
  return (
    <main
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '32px',
      }}
    >
      <h1>Vanilla Extract Component Showcase</h1>
      <p>Reusable components with type-safe styling and shared theme tokens.</p>

      <Card>
        <h2>Button Variants</h2>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
        </div>

        <h3>Button Sizes</h3>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button size="small">Small Button</Button>
          <Button size="large">Large Button</Button>
        </div>

        <h3>Button States</h3>

        <Button disabled>Disabled Button</Button>
      </Card>

      <Card style={{ marginTop: '24px' }}>
        <h2>Badge Variants</h2>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
        </div>
      </Card>

      <Card style={{ marginTop: '24px' }}>
        <h2>Reusable Card</h2>
        <p>This card uses shared spacing, background, border and radius tokens.</p>
        <Button variant="primary" size="small">
          View Details
        </Button>
      </Card>
    </main>
  )
}

export default App