class SupporterController < ApplicationController
  def index
    render :layout => "application", :template => "supporter/sign_up"
  end
  
  def sign_up
    # set your secret key: remember to change this to your live secret key in production
    # see your keys here https://manage.stripe.com/account
    Stripe.api_key = "IOznm5t5eX7zPzEtuZmunBMRadz07iW6"

    # get the credit card details submitted by the form
    token = params[:stripeToken]

    user  = User.find(params[:user_id])

    # create a Customer
    customer = Stripe::Customer.create(
      :card         => token,
      :plan         => "supporter",
      :description  => user[:email]
    )

    user.supporter    = true
    user.customer_id  = customer.id
    user.save
    
    redirect_to "/", :notice => "Thanks for becoming a supporter!"
  end
  
  def cancel_subscription
    Stripe.api_key = "IOznm5t5eX7zPzEtuZmunBMRadz07iW6"

    user              = User.find(current_user.id)

    customer          = Stripe::Customer.retrieve(user.customer_id)
    customer.delete
    
    user.supporter    = false
    user.customer_id  = nil
    user.save
    
    redirect_to "/users/edit", :notice => "Your subscription has been canceled."
  end
end