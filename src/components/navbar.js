import { Menu } from 'antd';

const NavBar = (props) => {
    const [currentKey, setCurrentKey] = useState("converter");

    const handleClick = e => {
        setCurrentKey(e.key);
    };

    return (
        <Menu onClick={handleClick} selectedKeys={current} mode="horizontal">
            <Menu.Item key="main" icon={<MailOutlined />}>
                Main Page
            </Menu.Item>
            <Menu.Item key="converter" icon={<MailOutlined />}>
                Converter
            </Menu.Item>
            <Menu.Item key="about" icon={<MailOutlined />}>
                About
            </Menu.Item>

        </Menu>
    );
};

export default NavBar;