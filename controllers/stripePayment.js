const stripe = require('stripe')(process.env.PUBLIC_KEY)
const uuidv1 = require('uuid/v1')


exports.makePayment = (req, res) =>{

    const { products, token} = req.body
    console.log("PRODUCTS" , products);
    let amount = 0
    products.map(p=>{
        amount = amount + p.price
    })

    //stop from charging double from user
    const idempotencyKey = uuidv1()
    return stripe.customers.create({
        email : token.email,
        source : token.id
    }).then(customer =>{
        stripe.charges.create({
            amount : amount * 100,
            currency : 'usd',
            customer : customer.id,
            receipt_email : token.email,
	    description : 'A test product.',
            shipping : {
                name : token.card.name,
		address : {
			line1 : token.card.address_line1,
			line2 : token.card.address_line2,
			city : token.card.address_city,
			country : token.card.address_country,
			postal_code : token.card.address_zip
			
		}

            }  
        },{idempotencyKey})
        .then(result=>res.status(200).json())
        .catch(error=>console.log(error)
        )
    })
}