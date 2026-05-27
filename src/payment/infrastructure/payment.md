#Pagos

### falta crear el endpoint de verificar pagos de mercado pago
- crear un middleware para el webhook de mercado pago que devuelva un 200 o 201
- el midlware debe devolver 403 si no envia la cabecera correcta
- en caso de aprobado, el endpoint debe setear el status a aprovado

el codigo se obtiene   const payment = await new Payment(mercadopago).get({id: body.data.id}) con el    const body: {data: {id: string}} = await request.json()
el  data.id proviene de:
```json
{
  "id": 12345,
  "live_mode": true,
  "type": "payment",
  "date_created": "2015-03-25T10:04:58.396-04:00",
  "user_id": 44444,
  "api_version": "v1",
  "action": "payment.created",
  "data": {
      "id": "999999999"
  }
 }
```
- a traves de la propiedad payment.metadata.text extraer la propedad text donde metimos la propiedad payment_id de la base de datos

### endpoint preferencia
- devuelve una url para realixar el pago

