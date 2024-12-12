import React, { useState } from "react";
import { Card, Row, Col, Statistic, Timeline, Calendar, Modal, List } from "antd";
import {
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import "./dashboard.style.scss";

const Dashboard_component = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  // Sample data - replace with actual data in production
  const completionStats = {
    totalTasks: 120,
    completedTasks: 95,
    weeklyProgress: 85,
    dailyStreak: 12,
  };

  const recentActivities = [
    {
      date: "2024-03-20",
      content: "Completed daily report",
      type: "success",
    },
    {
      date: "2024-03-19",
      content: "Generated weekly summary",
      type: "info",
    },
    {
      date: "2024-03-18",
      content: "Updated settings",
      type: "warning",
    },
  ];

  const getCalendarData = (value) => {
    const date = value.format('YYYY-MM-DD');
    
    // Example data structure - replace with actual data
    const activities = {
      '2024-03-14': {
        hasDaily: true,
        hasWeekly: true,
        items: [
          { type: 'success', title: 'Daily Report', time: '09:00 AM' },
          { type: 'success', title: 'Weekly Report', time: '02:30 PM' },
        ]
      },
      '2024-03-13': {
        hasDaily: true,
        hasWeekly: false,
        items: [
          { type: 'success', title: 'Daily Report', time: '09:15 AM' },
          { type: 'warning', title: 'Weekly Report Missing', time: '' },
        ]
      },
      // Add more dates as needed
    };

    return activities[date];
  };

  const dateCellRender = (value) => {
    const data = getCalendarData(value);
    
    // Only render indicators if there's data
    if (data) {
      return (
        <div className="calendar-indicators">
          {data.hasDaily && <div className="indicator daily" />}
          {data.hasWeekly && <div className="indicator weekly" />}
        </div>
      );
    }
    return null;
  };

  // Add this new function to handle cell click
  const onSelect = (value) => {
    const data = getCalendarData(value);
    if (data) {
      setSelectedDate(value.format('YYYY-MM-DD'));
      setSelectedData(data);
      setIsModalVisible(true);
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* Statistics Section */}
      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Tasks"
              value={completionStats.totalTasks}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Completed Tasks"
              value={completionStats.completedTasks}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Weekly Progress"
              value={completionStats.weeklyProgress}
              prefix={<ClockCircleOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Daily Streak"
              value={completionStats.dailyStreak}
              prefix={<UserOutlined />}
              suffix="days"
            />
          </Card>
        </Col>
      </Row>

      {/* Activity and Calendar Section */}
      <Row gutter={[16, 16]} className="content-row">
        <Col xs={24} lg={12}>
          <Card title="Recent Activities" className="timeline-card">
            <Timeline
              items={recentActivities.map(activity => ({
                color: activity.type === 'success' ? 'green' : 
                       activity.type === 'warning' ? 'orange' : 'blue',
                children: (
                  <>
                    <p className="timeline-date">{activity.date}</p>
                    <p className="timeline-content">{activity.content}</p>
                  </>
                ),
              }))}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Activity Calendar" className="calendar-card">
            <Calendar 
              fullscreen={false} 
              dateCellRender={dateCellRender}
              mode="month"
              onSelect={onSelect}
            />
          </Card>
        </Col>
      </Row>

      {/* Activity Details Modal */}
      <Modal
        title={`Activities for ${selectedDate}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedData && (
          <List
            itemLayout="horizontal"
            dataSource={selectedData.items}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <div 
                      className={`status-dot ${item.type}`}
                    />
                  }
                  title={item.title}
                  description={item.time}
                />
              </List.Item>
            )}
          />
        )}
      </Modal>
    </div>
  );
};

export default Dashboard_component;
