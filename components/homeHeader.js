import { Carousel } from 'antd'

const contentStyle = {
  height: '500px',
  color: '#fff',
  lineHeight: '160px',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#364d79',
  display: 'flex'
};

const HomeHeader = ({}) => {
  return(
    <div style={{marginBottom: 30}}>
      <Carousel 
      >
        <div>
          <img style={{width: '100%', height: 500, objectFit: 'cover'}} src="/images/27559.jpg" alt=""/>
        </div>
        <div>
          <h2 style={contentStyle}>2</h2>
        </div>
        <div>
          <h2 style={contentStyle}>3</h2>
        </div>
        <div>
          <h2 style={contentStyle}>4</h2>
        </div>
      </Carousel>
    </div>
  )
}
export default HomeHeader