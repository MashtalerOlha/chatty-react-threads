
import React, { useState } from 'react';
import { AIChatWidget } from '../components/chat/AIChatWidget';
import { AIChatConfig } from '../types/chat';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { MessageCircle, Settings, Sparkles } from 'lucide-react';

const Index = () => {
  const [showDemo, setShowDemo] = useState(false);

  // Конфігурація для демо
  const demoConfig: AIChatConfig = {
    placeholder: "Запитайте що завгодно...",
    maxMessages: 100,
    // Приклад custom функції для отримання відповідей
    onSendMessage: async (message: string, threadId: string) => {
      // Тут можна додати логіку для реального API
      await new Promise(resolve => setTimeout(resolve, 1500));
      return `Ви написали: "${message}". Це демо відповідь для thread ${threadId}.`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <MessageCircle className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">AI Chat Widget</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Сучасний віджет чату з підтримкою багатьох threads, схожий на ChatGPT. 
            Готовий до інтеграції у ваш проект.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle size={20} className="text-blue-600" />
                Багато чатів
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Створюйте та перемикайтесь між різними threads розмов
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles size={20} className="text-purple-600" />
                Сучасний UI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Інтерфейс схожий на ChatGPT з плавними анімаціями
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings size={20} className="text-green-600" />
                Налаштування
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Легко налаштовується під ваші потреби та API
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Demo Section */}
        <div className="text-center mb-8">
          <Button
            onClick={() => setShowDemo(!showDemo)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
          >
            {showDemo ? 'Сховати демо' : 'Показати демо'}
          </Button>
        </div>

        {/* Chat Widget Demo */}
        {showDemo && (
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Демонстрація віджету</CardTitle>
                <CardDescription>
                  Спробуйте створити новий чат та надіслати повідомлення
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AIChatWidget 
                  config={demoConfig}
                  className="mx-auto"
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Usage Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Як використовувати</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">1. Базове використання:</h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                <code className="text-sm">
                  {`import { AIChatWidget } from './components/chat/AIChatWidget';

<AIChatWidget />`}
                </code>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. З налаштуваннями:</h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                <code className="text-sm whitespace-pre-line">
                  {`const config = {
  apiEndpoint: 'https://your-api.com/chat',
  apiKey: 'your-api-key',
  placeholder: 'Ваш текст...'
};

<AIChatWidget config={config} />`}
                </code>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. З custom функцією:</h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                <code className="text-sm whitespace-pre-line">
                  {`const config = {
  onSendMessage: async (message, threadId) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message, threadId })
    });
    return await response.text();
  }
};`}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
