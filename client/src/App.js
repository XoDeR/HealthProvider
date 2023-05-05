import { Button, Space } from "antd";

function App() {
  return (
    <div className="App">
      <h1>Health Provider</h1>
      <Space wrap>
        <div className="p-5">
          <Button type="primary">Primary Button</Button>
        </div>

        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </Space>
    </div>
  );
}

export default App;
