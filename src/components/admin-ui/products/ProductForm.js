import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { createProduct, fetchAllProducts, savePhoto } from 'redux/product'
import { useDispatch } from 'react-redux'

export default function ProductForm() {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const { ref: titleRef, ...titleRest } = register('name', { required: true })
  const { ref: roomRef, ...roomRest } = register('room', { required: true })
  const { ref: durationRef, ...durationRest } = register('duration', {
    required: true,
  })
  const { ref: priceRef, ...priceRest } = register('price', { required: true })
  const { ref: photoRef, ...photoRest } = register('photo', { required: true })

  const onSubmit = (data) => {
    if (Object.keys(errors).length) {
      alert('Error saving product: ' + JSON.stringify(errors))
    } else {
      dispatch(savePhoto({ file: data.photo[0] })).then((action) => {
        const photoUrl = action.payload
        if (photoUrl) {
          dispatch(
            createProduct({
              name: data.name,
              room: data.room,
              duration: data.duration,
              price: data.price,
              photo: photoUrl,
            })
          ).then(() => {
            reset()
            dispatch(fetchAllProducts())
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
        <Label for="name">Product name</Label>
        <Input
          id="name"
          type="text"
          {...titleRest}
          innerRef={titleRef}
          invalid={errors.name}
        />
      </FormGroup>
      <FormGroup>
        <Label for="room">Product Room</Label>
        <Input
          id="room"
          type="select"
          {...roomRest}
          innerRef={roomRef}
          invalid={errors.room}
        >
          <option>Big</option>
          <option>Little</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="duration">Product Duration</Label>
        <Input
          id="duration"
          type="select"
          {...durationRest}
          innerRef={durationRef}
          invalid={errors.duration}
        >
          <option>60 mins</option>
          <option>90 mins</option>
          <option>120 mins</option>
          <option>All Day</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="type">Product Price</Label>
        <Input
          id="price"
          type="text"
          {...priceRest}
          innerRef={priceRef}
          invalid={errors.price}
        />
      </FormGroup>
      <FormGroup>
        <Label for="photo">Product Photo</Label>
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
        Add Product
      </Button>
    </Form>
  )
}
