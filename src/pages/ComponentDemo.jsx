// Create this as: src/pages/ComponentDemo.jsx
import React, { useState } from 'react';
import { User, Mail, Search, Settings } from 'lucide-react';

// Import all your UI components
import {
  Button,
  PrimaryButton,
  SecondaryButton,
  OutlineButton,
  DangerButton,
  Input,
  PasswordInput,
  TextArea,
  Select,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardDescription,
  Alert,
  AlertTitle,
  AlertDescription,
  SuccessAlert,
  ErrorAlert,
  WarningAlert,
  InfoAlert,
  Heading,
  H1,
  H2,
  H3,
  Text,
  SmallText,
  MutedText
} from '../components/ui';

const ComponentDemo = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    description: '',
    country: ''
  });

  const [showAlert, setShowAlert] = useState(true);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <H1>IELTS Chatbot Design System</H1>
          <Text size="lg" color="gray-600" className="mt-2">
            Component library showcase and testing ground
          </Text>
        </div>

        {/* Typography Section */}
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
            <CardDescription>Heading and text components with various styles</CardDescription>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <H1>Heading Level 1</H1>
              <H2>Heading Level 2</H2>
              <H3>Heading Level 3</H3>
              <Text>This is regular body text with normal weight.</Text>
              <Text weight="medium">This is medium weight text.</Text>
              <SmallText>This is small text, perfect for captions.</SmallText>
              <MutedText>This is muted text for less important information.</MutedText>
            </div>
          </CardBody>
        </Card>

        {/* Buttons Section */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Various button styles and states</CardDescription>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              
              {/* Button Variants */}
              <div>
                <H3 className="mb-3">Variants</H3>
                <div className="flex flex-wrap gap-3">
                  <PrimaryButton>Primary</PrimaryButton>
                  <SecondaryButton>Secondary</SecondaryButton>
                  <OutlineButton>Outline</OutlineButton>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="success">Success</Button>
                  <Button variant="warning">Warning</Button>
                  <DangerButton>Danger</DangerButton>
                </div>
              </div>

              {/* Button Sizes */}
              <div>
                <H3 className="mb-3">Sizes</H3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                </div>
              </div>

              {/* Button States */}
              <div>
                <H3 className="mb-3">States</H3>
                <div className="flex flex-wrap gap-3">
                  <Button leftIcon={<User className="w-4 h-4" />}>With Left Icon</Button>
                  <Button rightIcon={<Search className="w-4 h-4" />}>With Right Icon</Button>
                  <Button loading>Loading</Button>
                  <Button disabled>Disabled</Button>
                  <Button fullWidth>Full Width Button</Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Form Components Section */}
        <Card>
          <CardHeader>
            <CardTitle>Form Components</CardTitle>
            <CardDescription>Input fields, selects, and form elements</CardDescription>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column */}
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  leftIcon={<User className="w-4 h-4" />}
                  required
                />

                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  leftIcon={<Mail className="w-4 h-4" />}
                  helper="We'll never share your email"
                  required
                />

                <PasswordInput
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a secure password"
                  required
                />

                <Input
                  label="Error State Example"
                  placeholder="This field has an error"
                  error="This field is required"
                />
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <Select
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  options={countryOptions}
                  placeholder="Select your country"
                />

                <TextArea
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                  rows={4}
                />

                <Input
                  label="Small Size Input"
                  size="sm"
                  placeholder="Small input"
                />

                <Input
                  label="Large Size Input"
                  size="lg"
                  placeholder="Large input"
                />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Alerts Section */}
        <Card>
          <CardHeader>
            <CardTitle>Alerts & Feedback</CardTitle>
            <CardDescription>Status messages and notifications</CardDescription>
          </CardHeader>
          <CardBody className="space-y-4">
            
            <SuccessAlert>
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Your account has been created successfully. Welcome to the IELTS preparation platform!
              </AlertDescription>
            </SuccessAlert>

            <InfoAlert>
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                Your next IELTS test is scheduled for next month. Make sure to prepare well!
              </AlertDescription>
            </InfoAlert>

            <WarningAlert>
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                You have 3 practice tests remaining in your current plan.
              </AlertDescription>
            </WarningAlert>

            <ErrorAlert>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Unable to save your progress. Please check your internet connection and try again.
              </AlertDescription>
            </ErrorAlert>

            {showAlert && (
              <Alert
                variant="info"
                dismissible
                onDismiss={() => setShowAlert(false)}
              >
                <AlertTitle>Dismissible Alert</AlertTitle>
                <AlertDescription>
                  This alert can be dismissed by clicking the X button.
                </AlertDescription>
              </Alert>
            )}

          </CardBody>
        </Card>

        {/* Cards Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <Card hover>
            <CardHeader>
              <CardTitle>Hover Card</CardTitle>
              <CardDescription>This card has hover effects</CardDescription>
            </CardHeader>
            <CardBody>
              <Text>Hover over this card to see the elevation effect.</Text>
            </CardBody>
            <CardFooter>
              <Button size="sm" variant="outline">Learn More</Button>
            </CardFooter>
          </Card>

          <Card variant="blue" padding="lg">
            <CardBody>
              <H3>Blue Variant</H3>
              <Text className="mt-2">This card uses the blue background variant with large padding.</Text>
            </CardBody>
          </Card>

          <Card shadow="lg" rounded="lg">
            <CardBody>
              <H3>Enhanced Shadow</H3>
              <Text className="mt-2">This card has a larger shadow and rounded corners.</Text>
            </CardBody>
          </Card>

        </div>

        {/* Demo Form */}
        <Card>
          <CardHeader>
            <CardTitle>Complete Form Example</CardTitle>
            <CardDescription>A sample registration form using all components</CardDescription>
          </CardHeader>
          <CardBody>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="First Name" placeholder="John" required />
                <Input label="Last Name" placeholder="Doe" required />
              </div>
              
              <Input 
                label="Email" 
                type="email" 
                placeholder="john@example.com" 
                leftIcon={<Mail className="w-4 h-4" />}
                required 
              />
              
              <PasswordInput label="Password" placeholder="Create password" required />
              
              <Select 
                label="Preferred Test Center"
                options={[
                  { value: 'london', label: 'London, UK' },
                  { value: 'toronto', label: 'Toronto, Canada' },
                  { value: 'sydney', label: 'Sydney, Australia' }
                ]}
                placeholder="Select a test center"
              />
              
              <TextArea 
                label="Why do you want to take IELTS?"
                placeholder="Tell us about your goals..."
                rows={3}
              />
              
              <div className="flex gap-3">
                <PrimaryButton>Create Account</PrimaryButton>
                <OutlineButton>Cancel</OutlineButton>
              </div>
            </form>
          </CardBody>
        </Card>

      </div>
    </div>
  );
};

export default ComponentDemo;