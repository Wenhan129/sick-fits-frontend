import React, { Component } from "react";
import Link from "next/link";
import CreateItem from "../components/CreateItem";

const Sell = props => (
  <div>
    <Link href="/">
      <a>Home</a>
    </Link>
    <CreateItem />
  </div>
);

export default Sell;
