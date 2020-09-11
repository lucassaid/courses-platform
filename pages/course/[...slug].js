import CourseLayout from '../../components/courseLayout'
import { getCourseLessons } from '../../lib/courses'
import { Menu, Card, Avatar } from 'antd';
import { AppstoreOutlined, PlayCircleOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card
const { SubMenu } = Menu;

const Course = ({course}) => {

  const menu = (
    <Menu
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
    >
      <SubMenu
        key="sub1"
        title={
          <span>
            <span>Navigation One</span>
          </span>
        }
      >
        <Menu.Item icon={<PlayCircleOutlined/>} key="1">hola</Menu.Item>
        <Menu.ItemGroup key="g1" title="Item 1">
          <Menu.Item key="2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g2" title="Item 2">
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu
        key="sub4"
        title={
          <span>
            <SettingOutlined />
            <span>Navigation Three</span>
          </span>
        }
      >
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu>
    </Menu>
  )

  return (
    <CourseLayout menu={menu}>
      <iframe src="https://player.vimeo.com/video/453914540" width="640" height="853" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
    </CourseLayout>  
  )
}
export default Course

export async function getServerSideProps(context) {
  const course = await getCourseLessons(context.params.slug[0])
  return {
    props: {course}
  }
}