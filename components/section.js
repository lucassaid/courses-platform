
export const Container = ({children, className = ''}) => (
  <div className={`w-full max-w-5xl mx-auto px-4 ${className}`}>
    {children}
  </div>
)

export default function Section({
  children,
  backgroundAngle = 0,
  backgroundColor,
  style
}) {

  const bgStyle = {
    transform: `rotate(${backgroundAngle}deg)`,
    backgroundColor,
  }

  return(
    <section
      className="w-full relative z-10 my-20 py-14"
      style={style}
    >
      <Container className="relative z-10">
        {children}
      </Container>
      <div
        className="absolute -top-14 -right-1/4 -left-1/4 -bottom-14"
        style={bgStyle}
      />
    </section> 
  )
}