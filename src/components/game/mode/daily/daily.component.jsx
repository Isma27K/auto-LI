import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Input,
  Button,
  Card,
  Space,
  message,
  DatePicker,
  Tag,
  Statistic,
} from "antd";
import {
  PlusOutlined,
  UnorderedListOutlined,
  PercentageOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(weekday);

const Daily = () => {
  const START_DATE = dayjs("2025-01-06");
  const END_DATE = dayjs("2025-05-23");

  // Add sample data
  const sampleData = [
    {
      key: "1",
      date: "2025-01-06",
      content:
        "Completed the introduction to React hooks and implemented a custom useLocalStorage hook lorem hfihsrfhhfu fu hsrh fuhs fo fohu fou hsiu fhoiushuif huis fuih surfhuoh oriufhuis huf huh uhoiu houihoud huodhuih suifhuihefuherh fahf aerhfuoah ouihouidobovjoaduau fuoaoua huova huf hauohha ua hurfhuahufh au hau hauh oauih ouia huifha our huoai hfua rhgu ahruoh guaoh u hrgua hug hourg hoarug hau ghoua gho aurh oue .",
    },
    {
      key: "2",
      date: "2025-01-07",
      content:
        "Built a responsive navigation component using Ant Design and implemented mobile-first design principles.",
    },
    {
      key: "3",
      date: "2025-01-08",
      content:
        "Implemented user authentication flow and integrated JWT token management.",
    },
    {
      key: "4",
      date: "2025-01-13",
      content:
        "Created reusable form components and added form validation using Formik and Yup.",
    },
    {
      key: "5",
      date: "2025-01-15",
      content:
        "Optimized application performance by implementing React.memo and useMemo for expensive calculations.",
    },
    {
        key: "6",
        date: "2025-01-16",
        content:
          "Optimized application performance by implementing React.memo and useMemo for expensive calculations.",
      },
  ];

  const [data, setData] = useState(sampleData);
  const [expectedDates, setExpectedDates] = useState([]);
  const [form] = Form.useForm();

  // Generate all expected weekdays
  useEffect(() => {
    const dates = [];
    let currentDate = START_DATE;

    while (currentDate.isSameOrBefore(END_DATE)) {
      const dayOfWeek = currentDate.day();
      if (dayOfWeek > 0 && dayOfWeek < 6) {
        dates.push(currentDate.format("YYYY-MM-DD"));
      }
      currentDate = currentDate.add(1, "day");
    }
    setExpectedDates(dates);
  }, []);

  // Table columns configuration
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
      render: (text) => {
        const date = dayjs(text);
        return (
          <Space>
            {date.format("dddd")} - {date.format("MMMM D, YYYY")}
          </Space>
        );
      },
      width: "30%",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      width: "55%",
    },
    {
      title: "Actions",
      key: "actions",
      width: "15%",
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record.key)}>
          Delete
        </Button>
      ),
    },
  ];

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
    message.success("Entry deleted successfully");
  };

  const onFinish = (values) => {
    const selectedDate = values.date.format("YYYY-MM-DD");

    if (!expectedDates.includes(selectedDate)) {
      message.error(
        "Please select a weekday between Jan 6, 2025 - July 30, 2025"
      );
      return;
    }

    if (data.some((item) => item.date === selectedDate)) {
      message.error("An entry for this date already exists");
      return;
    }

    const newData = {
      key: Date.now().toString(),
      ...values,
      date: selectedDate,
    };
    setData([...data, newData]);
    message.success("Data added successfully");
    form.resetFields();
  };

  // Calculate statistics
  const totalExpectedDays = expectedDates.length;
  const filledDays = data.length;
  const completionRate = totalExpectedDays
    ? ((filledDays / totalExpectedDays) * 100).toFixed(1)
    : 0;

  // Add this custom date render function
  const dateRender = (current) => {
    const currentDate = current.format("YYYY-MM-DD");
    const isFilledDate = data.some((item) => item.date === currentDate);
    const isExpectedDate = expectedDates.includes(currentDate);
    const isPastDate = dayjs(currentDate).isBefore(dayjs(), "day");

    // Style for dates with entries
    const filledStyle = {
      position: "relative",
      backgroundColor: "#f6ffed",
      border: "1px solid #b7eb8f",
      borderRadius: "4px",
    };

    // Style for overdue dates (past dates without entries)
    const overdueStyle = {
      position: "relative",
      backgroundColor: "#fff1f0",
      border: "1px solid #ffa39e",
      borderRadius: "4px",
      color: "#cf1322",
    };

    // Only style the expected weekdays
    if (isExpectedDate) {
      let style = {};
      if (isFilledDate) {
        style = filledStyle;
      } else if (isPastDate) {
        style = overdueStyle;
      }

      return <div style={style}>{current.date()}</div>;
    }

    return current.date();
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Statistics Cards */}
        <Space
          size="large"
          wrap
          style={{ width: "100%", justifyContent: "center", gap: "16px" }}
        >
          <Card style={{ width: "280px" }}>
            <Statistic
              title="Expected Days"
              value={totalExpectedDays}
              prefix={<UnorderedListOutlined />}
            />
          </Card>
          <Card style={{ width: "280px" }}>
            <Statistic
              title="Filled Days"
              value={filledDays}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
          <Card style={{ width: "280px" }}>
            <Statistic
              title="Completion Rate"
              value={completionRate}
              suffix="%"
              prefix={<PercentageOutlined />}
              precision={1}
            />
          </Card>
        </Space>

        {/* Data Entry Form */}
        <Card title="Add New Entry">
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: "Please select a date" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                disabledDate={(current) => {
                  return !expectedDates.includes(current.format("YYYY-MM-DD"));
                }}
                dateRender={dateRender}
              />
            </Form.Item>

            <Form.Item
              name="content"
              label="Content"
              rules={[{ required: true, message: "Please enter content" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Add Entry
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/* Data Display Table */}
        <Card
          title="Daily Entries"
          extra={
            <Space>
              <Tag color="blue">{`Progress: ${completionRate}%`}</Tag>
              <Tag color="orange">{`Missing: ${
                totalExpectedDays - filledDays
              } days`}</Tag>
            </Space>
          }
        >
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 5 }}
            bordered
            scroll={{ x: 800 }}
          />
        </Card>
      </Space>
    </div>
  );
};

export default Daily;
