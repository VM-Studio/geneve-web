import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingCart, MessageCircle, FileText } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { Textarea } from '../components/ui/Textarea';
import { useCart } from '../store/CartContext';
import { useWhatsAppMessage } from '../hooks/useWhatsAppMessage';

export const Quote: React.FC = () => {
  const [notes, setNotes] = useState('');
  const { items, removeItem, incrementItem, decrementItem, clearCart, getTotalItems } = useCart();
  const { sendQuote } = useWhatsAppMessage();

  const handleSendQuote = () => {
    if (items.length === 0) {
      alert('Please add items to your quote before sending.');
      return;
    }
    
    sendQuote({ items, notes });
  };

  const totalItems = getTotalItems();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Container className="py-16">
          <div className="text-center max-w-lg mx-auto">
            <div className="text-gray-400 mb-6">
              <ShoppingCart className="w-24 h-24 mx-auto" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your Quote is Empty
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Start by adding products from our catalog to request a quote
            </p>
            <Button as={Link} to="/catalog" size="lg" className="inline-flex items-center space-x-2">
              <span>Browse Catalog</span>
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button
              as={Link}
              to="/catalog"
              variant="ghost"
              className="mb-4 flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Catalog</span>
            </Button>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Quote Request
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              {totalItems} item{totalItems !== 1 ? 's' : ''} in your quote
            </p>
          </div>
          
          {items.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 hover:border-red-300"
            >
              Clear All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quote Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${Math.random()}`} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="w-full sm:w-24 h-48 sm:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      SKU: {item.sku}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-700">Quantity:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => decrementItem(item.id)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-medium min-w-16 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => incrementItem(item.id)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quote Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Quote Summary
            </h2>

            {/* Items Summary */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Items:</span>
                <span className="font-medium">{totalItems}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Product Lines:</span>
                <span className="font-medium">{items.length}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-6">
              <Textarea
                label="Additional Notes"
                placeholder="Add delivery details, deadlines, or special requests..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                fullWidth
                rows={4}
              />
            </div>

            {/* WhatsApp Quote Button */}
            <Button
              onClick={handleSendQuote}
              size="lg"
              className="w-full bg-green-600 hover:bg-green-700 border-green-600 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Request Quote via WhatsApp</span>
            </Button>
            
            <p className="text-xs text-gray-500 text-center mt-3">
              This will open WhatsApp with a pre-filled message containing your quote details
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};