import React from 'react'

export default function Contact() {
  return (
    <main>
        <h1 className='text-white text-center'>Contact Us</h1>
        <div className="bg-white rounded w-75 p-4">
            <p>Like the app? Want to donate to help me develop this site and take my kiddo to Disney? Click the button below to donate with Paypal!</p>
                <form className="text-center" action="https://www.paypal.com/donate" method="post" target="_top">
                <input type="hidden" name="hosted_button_id" value="354AEWWXF4Z8A" />
                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                </form>
        </div>
    </main>
  )
}
