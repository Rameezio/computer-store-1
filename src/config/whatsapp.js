// WhatsApp Configuration
export const WHATSAPP_CONFIG = {
  // Admin WhatsApp number (format: 92XXXXXXXXXX without +)
  ADMIN_NUMBER: import.meta.env.VITE_WHATSAPP_NUMBER || '923041109928',
  
  // Generate WhatsApp message URL
  generateOrderMessage: (orderDetails) => {
    const {
      customerName,
      phoneNumber,
      address,
      city,
      notes,
      items,
      subtotal,
      deliveryFee,
      total
    } = orderDetails;

    let message = `🛒 *NEW ORDER*\n\n`;
    message += `👤 *Customer Details*\n`;
    message += `Name: ${customerName}\n`;
    message += `Phone: ${phoneNumber}\n`;
    message += `Address: ${address}\n`;
    message += `City: ${city}\n`;
    if (notes) message += `Notes: ${notes}\n\n`;

    message += `📦 *Order Items*\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Qty: ${item.quantity} × Rs. ${item.price}\n`;
      message += `   Subtotal: Rs. ${item.quantity * item.price}\n`;
    });

    message += `\n💰 *Payment Summary*\n`;
    message += `Subtotal: Rs. ${subtotal}\n`;
    message += `Delivery: ${deliveryFee === 0 ? 'FREE' : 'Rs. ' + deliveryFee}\n`;
    message += `*Total: Rs. ${total}*\n`;
    message += `\nPayment Method: Cash on Delivery`;

    return encodeURIComponent(message);
  },

  // Open WhatsApp with message
  openWhatsApp: (message) => {
    const url = `https://wa.me/${WHATSAPP_CONFIG.ADMIN_NUMBER}?text=${message}`;
    window.open(url, '_blank');
  }
};
