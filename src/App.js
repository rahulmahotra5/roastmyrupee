import React, { useState, useEffect } from 'react';
import FamPayLogo from './FamCoin.webp';
import BannerMeme from './BannerMeme';
import { MessageCircle, TrendingUp, Send, Bot, DollarSign, ShoppingCart, Car, Gamepad2, Pizza } from 'lucide-react';

const FinancialWellnessApp = () => {
  const [activeTab, setActiveTab] = useState('coach');
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [spendingAnalysis, setSpendingAnalysis] = useState(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);

  // Mock transaction data
  const transactionHistory = [
    { id: 1, merchant: 'Zomato', amount: 450, category: 'food', date: '2024-09-24', description: 'Biryani + Coke', famxCard: true },
    { id: 12, merchant: 'KFC', amount: 420, category: 'food', date: '2024-09-18', description: 'Zinger Burger Combo', famxCard: true },
  ];

  const lastTransaction = transactionHistory[0];

  const analyzeTransactionContext = (transactions) => {
    const categoryTotals = {};
    const categoryCount = {};
    let totalSpent = 0;
    
    transactions.forEach(transaction => {
      categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + transaction.amount;
      categoryCount[transaction.category] = (categoryCount[transaction.category] || 0) + 1;
      totalSpent += transaction.amount;
    });
    
    const topCategory = Object.keys(categoryTotals).reduce((a, b) => 
      categoryTotals[a] > categoryTotals[b] ? a : b
    );
    
    return {
      totalSpent,
      topCategory,
      categoryBreakdown: categoryTotals,
      spendingPattern: 'frequent_small_purchases',
      monthlyAverage: Math.round(totalSpent / 2)
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = { type: 'user', content: inputMessage };
    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    setTimeout(() => {
      let response = "I'm here to help! Ask me about budgeting, saving, or your spending patterns. 💬";

      if (inputMessage.toLowerCase().includes('budget')) {
        response = "Nice! You spend ~₹1,400/week on food delivery. Try allocating ₹1,000 in a ‘Food Fun’ envelope. Saves ₹200+/week! 🎯";
      } else if (inputMessage.toLowerCase().includes('save')) {
        response = "🔥 Pro tip: Cook just 2 meals/week. That’s ₹800+ saved monthly. Invest half — future you will thank present you! 🌟";
      } else if (inputMessage.toLowerCase().includes('invest')) {
        response = "🚀 Even ₹500/month in SIP at 12% = ₹90k in 10 years. Start small. Consistency > size. Let’s automate it!";
      }
      
      const botMessage = { type: 'bot', content: response };
      setChatMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateSpendingAnalysis = () => {
    setIsLoadingAnalysis(true);
    
    const context = analyzeTransactionContext(transactionHistory);
    
    setTimeout(() => {
      const analysis = {
        totalSpent: context.totalSpent,
        topCategory: context.topCategory,
        categoryTotals: context.categoryBreakdown,
        insights: [
          {
            title: "🍕 Food Delivery Habit",
            percentage: Math.round((context.categoryBreakdown.food / context.totalSpent) * 100),
            analysis: `₹${context.categoryBreakdown.food} on food apps suggests convenience-first mindset. Could be time crunch or habit.`,
            psychology: "Using food as comfort or social currency? High frequency hints at emotional or routine-based spending.",
            recommendation: "Try 2 home-cooked meals weekly. Save ₹800+/month & discover new recipes!"
          },
          {
            title: "🛍️ Impulse Shopping",
            percentage: Math.round((context.categoryBreakdown.shopping / context.totalSpent) * 100),
            analysis: `₹${context.categoryBreakdown.shopping} on shopping — possibly FOMO-driven or identity expression.`,
            psychology: "Retail therapy releases dopamine. Are you celebrating wins or coping with stress?",
            recommendation: "Use the 24-hour rule. Wait a day. 70% of urges fade by tomorrow."
          },
          {
            title: "🎮 Experience Seeker",
            percentage: Math.round(((context.categoryBreakdown.gaming || 0) + (context.categoryBreakdown.entertainment || 0)) / context.totalSpent * 100),
            analysis: "You invest in experiences over things — great for mental health!",
            psychology: "Extroverted or experience-driven personality. Values memories, not material goods.",
            recommendation: "Keep this spending healthy. Just cap it at 15% of income."
          }
        ],
        overallPersonality: "You’re a time-poor, experience-loving spender who values convenience. With small tweaks, you can redirect habits into wealth-building."
      };
      
      setSpendingAnalysis(analysis);
      setIsLoadingAnalysis(false);
    }, 2500);
  };

  useEffect(() => {
    if (activeTab === 'habits' && !spendingAnalysis) {
      generateSpendingAnalysis();
    }
  }, [activeTab, spendingAnalysis]);

  const getCategoryIcon = (category) => {
    const icons = {
      food: <Pizza className="w-5 h-5 text-orange-500" />,
      shopping: <ShoppingCart className="w-5 h-5 text-amber-600" />,
      gaming: <Gamepad2 className="w-5 h-5 text-yellow-600" />,
      transport: <Car className="w-5 h-5 text-orange-700" />,
      entertainment: <DollarSign className="w-5 h-5 text-yellow-700" />
    };
    return icons[category] || <DollarSign className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-yellow-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl flex items-center justify-center shadow-md">
              <img src={FamPayLogo} alt="FamPay" className="w-8 h-8 object-contain" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-700 bg-clip-text text-transparent">
              Rupee-Roast
            </h1>
          </div>
          <p className="text-gray-600 text-sm">Your spending, roasted with love 🔥</p>
        </div>

        {/* Dynamic Meme Banner */}
        <BannerMeme lastTransaction={lastTransaction} />

        {/* Tabs */}
        <div className="flex mb-8 bg-white rounded-2xl p-1 shadow-md border border-orange-100">
          <button
            onClick={() => setActiveTab('coach')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
              activeTab === 'coach'
                ? 'bg-gradient-to-r from-orange-400 to-yellow-400 text-white shadow-sm'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            Spend Sensei 
          </button>
          <button
            onClick={() => setActiveTab('habits')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
              activeTab === 'habits'
                ? 'bg-gradient-to-r from-orange-400 to-yellow-400 text-white shadow-sm'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Mind Over Money
          </button>
        </div>

        {/* Chat Tab */}
        {activeTab === 'coach' && (
          <div className="bg-white rounded-2xl shadow-lg border border-orange-100">
            <div className="h-96 overflow-y-auto p-5 space-y-4">
              {chatMessages.length === 0 ? (
                <div className="text-center text-gray-500 mt-16">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Bot className="w-5 h-5 text-orange-600" />
                  </div>
                  <p className="font-semibold text-gray-800">Hey there! 👋</p>
                  <p className="text-sm text-gray-600 max-w-xs mx-auto">Ask me anything — budgeting, saving, investing, or why you bought those headphones.</p>
                </div>
              ) : (
                chatMessages.map((message, index) => (
                  <div key={index} className={`flex gap-2.5 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.type === 'bot' && (
                      <div className="w-9 h-9 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-orange-600" />
                      </div>
                    )}
                    <div className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-medium shadow-sm' 
                        : 'bg-gray-50 text-gray-800 border border-gray-200'
                    }`}>
                      {message.content}
                    </div>
                  </div>
                ))
              )}
              
              {isTyping && (
                <div className="flex gap-2.5 justify-start ml-2">
                  <div className="w-9 h-9 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-200 inline-flex">
                    <div className="flex space-x-1.5">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-100 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about saving, budgets..."
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent bg-white text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 disabled:opacity-60 text-white px-4 py-2.5 rounded-xl flex items-center font-medium shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Habits Tab */}
        {activeTab === 'habits' && (
          <div className="space-y-6">
            {isLoadingAnalysis ? (
              <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-orange-100">
                <div className="inline-block animate-spin w-8 h-8 border-3 border-orange-400 border-t-transparent rounded-full mb-3"></div>
                <h3 className="text-lg font-medium text-gray-800">Decoding your money mind...</h3>
                <p className="text-orange-600 text-sm">AI analyzing 7 behavioral signals</p>
              </div>
            ) : spendingAnalysis ? (
              <>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-5">🧠 Your Money Mindset</h2>
                  <p className="text-gray-700 text-base mb-5">{spendingAnalysis.overallPersonality}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-100 text-center">
                      <p className="text-2xl font-black text-orange-700">₹{spendingAnalysis.totalSpent.toLocaleString()}</p>
                      <p className="text-xs text-gray-600 font-medium mt-1">Total Spent</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-100 text-center">
                      <p className="text-2xl font-black text-yellow-700">{Object.keys(spendingAnalysis.categoryTotals).length}</p>
                      <p className="text-xs text-gray-600 font-medium mt-1">Spending Zones</p>
                    </div>
                  </div>
                </div>

                {spendingAnalysis.insights.map((insight, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-xl font-bold text-gray-900">{insight.title}</h3>
                      <span className="bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800 px-3 py-1.5 rounded-full font-bold text-sm min-w-[50px] text-center">
                        {insight.percentage}%
                      </span>
                    </div>
                    
                    <div className="space-y-4 text-sm">
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <h4 className="font-semibold text-gray-900">📊 Spending Pattern</h4>
                        <p className="text-gray-700 mt-1">{insight.analysis}</p>
                      </div>
                      
                      <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                        <h4 className="font-semibold text-gray-900">🧠 Psychology</h4>
                        <p className="text-gray-700 mt-1">{insight.psychology}</p>
                      </div>
                      
                      <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                        <h4 className="font-semibold text-gray-900">💡 Fix This</h4>
                        <p className="text-gray-800 font-medium mt-1">{insight.recommendation}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-5">🗂️ Where It All Went</h3>
                  <div className="space-y-3">
                    {Object.entries(spendingAnalysis.categoryTotals)
                      .sort(([,a], [,b]) => b - a)
                      .map(([category, amount]) => (
                        <div key={category} className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                          <div className="flex items-center gap-3">
                            {getCategoryIcon(category)}
                            <span className="font-medium text-gray-900 capitalize">{category}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">₹{amount.toLocaleString()}</p>
                            <p className="text-xs text-orange-700 font-semibold">
                              {Math.round((amount / spendingAnalysis.totalSpent) * 100)}%
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-orange-100">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-gray-700 text-base mb-5">Uncover what your spending says about you.</p>
                <button 
                  onClick={generateSpendingAnalysis}
                  className="bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white px-6 py-2.5 rounded-xl font-medium shadow-sm transition-all"
                >
                  Unlock Insights
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialWellnessApp;
