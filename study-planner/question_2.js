 function trackExpense(budget, action, amount) {
  // if statement transactions over ₦50,000
  if (amount > 50000) {
  return "Transaction not approved! Single transactions cannot exceed ₦50,000 for security reasons.";
  }
  // Check if it is greater than 0
  if (amount < 0) {
  return " Invalid amount. Amount must be greater than 0.";
  }
  if (action === "spend") {
  
    //balance Check
  if (budget >= amount) {
  const newBudget = budget - amount;
  return `You spent ₦${amount.toLocaleString()}. Remaining budget: ₦${newBudget.toLocaleString()}.`;
  } else {
  return "Sorry You Have Exhausted Your Budget. Try again to complete transaction.";
  }
  } else if (action === "add") {
 
    // Add amount to budget
  const newBudget = budget + amount;
  return `You added ₦${amount.toLocaleString()}. New budget: ₦${newBudget.toLocaleString()}.`;
  } else {
  return "Invalid action. Use 'spend' or 'add'.";
  }
  }

