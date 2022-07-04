import { useEffect, useRef } from "react";

import Cookies from "js-cookie";
import { useFormik } from 'formik'
import * as Yup from 'yup';

import CategoryService from 'services/CategoryService';

import { Button, Table } from '@nextui-org/react';

export default function EffiPage({ categories }) {
  const cookie = Cookies.get("refresh_token");

  const categoriesRef = useRef()

  const formik = useFormik({
    initialValues: {
      categories: ""
    },
    validationSchema: Yup.object({
      categories: Yup.string(),
    }),
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { handleSubmit, handleChange, values } = formik;

  // const { data: categories } = await ProductService.getProd<uctByCategoryId()
  
  const category = categoriesRef.current && Array.from(categoriesRef.current.options)
    .filter((category) => category.value === values.categories)[0]
    console.log(category)

  return <form onSubmit={handleSubmit}>
    <select
      name="categories" 
      id="categories" 
      onChange={handleChange} 
      value={values.categories}
      ref={categoriesRef}
    >
      {categories.map((category) => (
        <option value={category.id} key={category.id}>{category.name}</option>
      ))}
    </select>
    <Button type="submit">Generar excel de mis productos</Button>

    {category.textContent}

    <Table
      aria-label="Example table with static content"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      {category.textContent}
      <Table.Header>
        <Table.Column>NAME</Table.Column>
        <Table.Column>ROLE</Table.Column>
        <Table.Column>STATUS</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row key="1">
          <Table.Cell>Tony Reichert</Table.Cell>
          <Table.Cell>CEO</Table.Cell>
          <Table.Cell>Active</Table.Cell>
        </Table.Row>
        <Table.Row key="2">
          <Table.Cell>Zoey Lang</Table.Cell>
          <Table.Cell>Technical Lead</Table.Cell>
          <Table.Cell>Paused</Table.Cell>
        </Table.Row>
        <Table.Row key="3">
          <Table.Cell>Jane Fisher</Table.Cell>
          <Table.Cell>Senior Developer</Table.Cell>
          <Table.Cell>Active</Table.Cell>
        </Table.Row>
        <Table.Row key="4">
          <Table.Cell>William Howard</Table.Cell>
          <Table.Cell>Community Manager</Table.Cell>
          <Table.Cell>Vacation</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </form>;
}

export const getServerSideProps = async (ctx) => {
  const { data: categories } = await CategoryService.getAll()

  return {
    props: {
      categories: categories,
    }
  }
}