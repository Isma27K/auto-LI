import React, { useState } from "react";
import {Switch, Upload, Button, Input, Card, Space, message, List, Typography, Tooltip,} from "antd";
import { UploadOutlined, DeleteOutlined, SendOutlined, FileOutlined, PlusOutlined,} from "@ant-design/icons";
import "./weekly.style.scss";

const { TextArea } = Input;
const { Title } = Typography;

const Weekly = () => {
  const [formData, setFormData] = useState({
    includeHeader: true,
    includeDateStamp: true,
    prompt: "",
    images: [],
    compressImages: true,
  });

  const [generatedFiles, setGeneratedFiles] = useState([
    // Example data - remove in production
    {
      id: 1,
      name: "Report-2024-03-20.pdf",
      url: "#",
      createdAt: "2024-03-20 14:30",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = ({ fileList }) => {
    setFormData((prev) => ({
      ...prev,
      images: fileList,
    }));
  };

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      // Here you would handle the PDF generation
      // const response = await generatePDF(formData);
      message.success("Report generated successfully!");
    } catch (error) {
      message.error("Failed to generate report");
    } finally {
      setLoading(false);
    }
  };

  const handleSendReport = async (fileId) => {
    try {
      // Here you would handle sending the report
      // await sendReport(fileId);
      message.success("Report sent successfully!");
    } catch (error) {
      message.error("Failed to send report");
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      // Here you would handle file deletion
      setGeneratedFiles(prev => prev.filter(file => file.id !== fileId));
      message.success("File deleted successfully!");
    } catch (error) {
      message.error("Failed to delete file");
    }
  };

  const handleOpenFile = (fileUrl) => {
    // Here you would handle opening the PDF in a new tab
    window.open(fileUrl, '_blank');
  };

  return (
    <div className="weekly-container">
      <Card className="form-card">
        <Title level={3}>Weekly Report Generator</Title>
        
        <div className="form-section">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div className="switches">
              <Space>
                <Switch
                  checked={formData.includeHeader}
                  onChange={(checked) => handleInputChange("includeHeader", checked)}
                  checkedChildren="Header On"
                  unCheckedChildren="Header Off"
                />
                <Switch
                  checked={formData.includeDateStamp}
                  onChange={(checked) => handleInputChange("includeDateStamp", checked)}
                  checkedChildren="Date On"
                  unCheckedChildren="Date Off"
                />
                <Switch
                  checked={formData.compressImages}
                  onChange={(checked) => handleInputChange("compressImages", checked)}
                  checkedChildren="Compress On"
                  unCheckedChildren="Compress Off"
                />
              </Space>
            </div>

            <TextArea
              placeholder="Enter your prompt for content generation..."
              value={formData.prompt}
              onChange={(e) => handleInputChange("prompt", e.target.value)}
              rows={4}
              className="prompt-input"
            />

            <Upload
              listType="picture-card"
              fileList={formData.images}
              onChange={handleImageUpload}
              multiple
              accept="image/*"
              beforeUpload={() => false}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>

            <Button
              type="primary"
              onClick={handleGenerateReport}
              loading={loading}
              icon={<FileOutlined />}
              size="large"
              block
            >
              Generate Report
            </Button>
          </Space>
        </div>
      </Card>

      <Card className="files-card" title="Generated Reports">
        <List
          dataSource={generatedFiles}
          renderItem={(file) => (
            <List.Item
              key={file.id}
              actions={[
                <Tooltip title="Open Report">
                  <Button
                    type="link"
                    onClick={() => handleOpenFile(file.url)}
                    icon={<FileOutlined />}
                  />
                </Tooltip>,
                <Tooltip title="Send Report">
                  <Button
                    type="link"
                    onClick={() => handleSendReport(file.id)}
                    icon={<SendOutlined />}
                  />
                </Tooltip>,
                <Tooltip title="Delete">
                  <Button
                    type="link"
                    danger
                    onClick={() => handleDeleteFile(file.id)}
                    icon={<DeleteOutlined />}
                  />
                </Tooltip>,
              ]}
            >
              <List.Item.Meta
                title={file.name}
                description={file.createdAt}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Weekly;
