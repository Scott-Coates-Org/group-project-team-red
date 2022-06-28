import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { createAddOn, fetchAllAddOns, savePhoto } from 'redux/addOn'

export default function AddOnForm() {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const { ref: nameRef, ...nameRest } = register('name', { required: true })
  const { ref: priceRef, ...priceRest } = register('price', { required: true })
  const { ref: photoRef, ...photoRest } = register('photo', { required: true })

  const onSubmit = (data) => {
    if (Object.keys(errors).length) {
      alert('Error saving add-on: ' + JSON.stringify(errors))
    } else {
      dispatch(savePhoto({ file: data.photo[0] })).then((action) => {
        const photoUrl = action.payload
        if (photoUrl) {
          dispatch(
            createAddOn({
              name: data.name,
              price: data.price,
              photo: photoUrl,
            })
          ).then(() => {
            reset()
            dispatch(fetchAllAddOns())
          })
        }
      })
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="p-3 my-3 border border-primary"
    >
      <FormGroup>
        <Label for="name">Add-On Name</Label>
        <Input
          id="name"
          type="text"
          {...nameRest}
          innerRef={nameRef}
          invalid={errors.name}
        />
      </FormGroup>
      <FormGroup>
        <Label for="room">Add-On Price</Label>
        <Input
          id="price"
          type="text"
          {...priceRest}
          innerRef={priceRef}
          invalid={errors.price}
        />
      </FormGroup>
      <FormGroup>
        <Label for="photo">Add-On Photo</Label>
        <Input
          id="photo"
          type="file"
          accept="image/*"
          {...photoRest}
          innerRef={photoRef}
          invalid={errors.photo}
        />
      </FormGroup>
      <Button type="submit" color="primary">
        Create Add-On
      </Button>
    </Form>
  )
}
