import React, { useState } from "react";
import { Card, Form, Input, Switch, Button, Divider, message, Space, Typography, Tooltip } from "antd";
import { KeyOutlined, SaveOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./setting.style.scss";

const { Title, Text } = Typography;

const SettingPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSaveSettings = async (values) => {
        setLoading(true);
        try {
            // Here you would typically save to your backend or localStorage
            console.log("Saved settings:", values);
            message.success("Settings saved successfully!");
        } catch (error) {
            message.error("Failed to save settings");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="settings-container">
            <Card className="settings-card">
                <Title level={2}>Settings</Title>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSaveSettings}
                    initialValues={{
                        darkMode: false,
                        notifications: true,
                        autoSave: true,
                    }}
                >
                    {/* API Keys Section */}
                    <div className="settings-section">
                        <Title level={4}>API Keys</Title>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Form.Item
                                name="openaiKey"
                                label={
                                    <Space>
                                        <KeyOutlined />
                                        <Text>OpenAI API Key</Text>
                                        <Tooltip title="Enter your OpenAI API key for AI features">
                                            <Text type="secondary">(Required)</Text>
                                        </Tooltip>
                                    </Space>
                                }
                                rules={[{ required: true, message: 'Please enter your OpenAI API key' }]}
                            >
                                <Input.Password
                                    placeholder="sk-..."
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>

                            <Form.Item
                                name="geminiKey"
                                label={
                                    <Space>
                                        <KeyOutlined />
                                        <Text>Google Gemini API Key</Text>
                                        <Tooltip title="Enter your Gemini API key for alternative AI features">
                                            <Text type="secondary">(Optional)</Text>
                                        </Tooltip>
                                    </Space>
                                }
                            >
                                <Input.Password
                                    placeholder="Enter Gemini API key"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>
                        </Space>
                    </div>

                    <Divider />

                    {/* General Settings Section */}
                    <div className="settings-section">
                        <Title level={4}>General Settings</Title>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Form.Item
                                name="darkMode"
                                label={<Text>Dark Mode</Text>}
                                valuePropName="checked"
                            >
                                <Switch />
                            </Form.Item>

                            <Form.Item
                                name="notifications"
                                label={<Text>Enable Notifications</Text>}
                                valuePropName="checked"
                            >
                                <Switch />
                            </Form.Item>

                            <Form.Item
                                name="autoSave"
                                label={<Text>Auto-save Reports</Text>}
                                valuePropName="checked"
                            >
                                <Switch />
                            </Form.Item>
                        </Space>
                    </div>

                    <Divider />

                    {/* User Preferences Section */}
                    <div className="settings-section">
                        <Title level={4}>User Preferences</Title>
                        <Form.Item
                            name="defaultPrompt"
                            label={<Text>Default Report Prompt</Text>}
                        >
                            <Input.TextArea
                                placeholder="Enter your default prompt template..."
                                rows={4}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<SaveOutlined />}
                            loading={loading}
                            block
                        >
                            Save Settings
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default SettingPage;
