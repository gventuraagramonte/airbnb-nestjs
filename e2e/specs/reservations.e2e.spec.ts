describe('Reservations', () => { 
    let jwt:string

    beforeAll(async()=>{
        const user = {
            email: 'giorgiov@gmail.com',
            password: 'UnP4sswordBienR0busto#'
        }

        await fetch('http://auth:3001/users',{
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const response = await fetch('http://auth:3001/auth/login',{
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const regex = /Authentication=([^;]+)/;
        const w = await response.headers.getSetCookie();
        const match = w[0].match(regex)
        jwt = `${match[1]}`
    })

    test('Create & Get',async () => {
        const createdReservation = await createReservation()
        
        const responseGet = await fetch(
            `http://reservations:3000/reservations/${createdReservation._id}`,
            {
                headers: {
                    'Cookie': `Authentication=${jwt}`
                }
            }
        )
        const reservation = await responseGet.json()
        expect(createdReservation).toEqual(reservation)
    })

    const createReservation =async () => {
        
        const responseCreate = await fetch(
            'http://reservations:3000/reservations',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `Authentication=${jwt}`
                },
                body: JSON.stringify({
                    startDate: '02-01-2026',
                    endDate: '02-05-2026',
                    placeId: '1234',
                    invoiceId: '139211',
                    charge: {
                        amount: 24,
                        card: {
                            cvc: '429',
                            exp_month: 12,
                            exp_year: 2027,
                            number: '4242 4242 4242 4242'
                        }
                    }
                })
            }
        )
        
        expect(responseCreate.ok).toBeTruthy()
        return responseCreate.json()
    }
 })