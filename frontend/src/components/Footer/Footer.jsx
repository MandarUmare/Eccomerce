import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import { BsFillSendFill } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer bg-indigo-100 py-6 min-h-[70vh] px-16 ">
      <Container className="flex  bg-indigo-100 h-full flex-col">
        <Row className="grid sm:grid-cols-4 grid-cols-1">
          <Col lg="3" md="4" sm="6" className="p-4  ">
            <div className="footer__logo text-start">
              <img
                className="w-24 h-16"
                src={"../../../public/images.png"}
                alt="logo"
              />
              <h5 className="text-xl font-bold mb-4 mt-4">Eccomerce</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusamus placeat totam laborum ratione, aspernatur enim error .
              </p>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6" className="p-4 ">
            <h5 className="footer__title text-xl font-bold mb-4">HELP</h5>
            <ListGroup className="delivery__time-list">
              <ListGroupItem className="mt-7 delivery__time-item border-0 ps-0">
                <p className="my-2 hover:text-red-500 cursor-pointer ">
                  Delivery
                </p>
                <p className="my-2 hover:text-red-500 cursor-pointer">
                  Returns
                </p>
                <p className="my-2 hover:text-red-500 cursor-pointer">
                  Secure Payments
                </p>
                <p className="my-2 hover:text-red-500 cursor-pointer">
                  Track an order
                </p>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="3" md="4" sm="6" className="p-4 ">
            <h5 className="text-xl font-bold mb-4">Contact</h5>
            <ListGroup className="delivery__time-list">
              <ListGroupItem className="my-6  delivery__time-item border-0 ps-0">
                <p>Location : MyColony,Lycet-210, Akurdi</p>
              </ListGroupItem>

              <ListGroupItem className="my-6  delivery__time-item border-0 ps-0">
                <span className="font-semibold">Phone: 7058071226</span>
              </ListGroupItem>

              <ListGroupItem className="my-6 delivery__time-item border-0 ps-0">
                <span className="font-semibold hover:text-red-500 cursor-pointer">
                  Email: mandarumare2003@gmail.com
                </span>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="3" md="4" sm="6" className="p-4 ">
            <h5 className="text-xl font-bold mb-4">Newsletter</h5>
            <p className="my-4 mt-6">Subscribe our newsletter</p>
            <div className="relative newsletter flex justify-between h-14">
              <input
                className="h-full px-4 mt-2 border-[1px] rounded-2xl border-zinc-500 bg-indigo-100"
                type="email"
                placeholder="Enter Your email"
              />
              <a
                href="mailto:mandarumare2003@gmail.com"
                className="relative top-6 right-12  cursor-pointer "
              >
                <BsFillSendFill
                  className="text-red-500"
                  size={25}
                ></BsFillSendFill>
              </a>
            </div>
          </Col>
        </Row>
        <Row className="mt-5 flex sm:flex-row flex-col  bg-indigo-100 justify-between">
          <Col lg="6" md="6">
            <p className="copyright__text text-sm text-blue-900 font-semibold">
              Copyright@ 2024,Website made by Mandar Umare. All Rights Reserved.
            </p>
          </Col>
          <Col lg="6" md="6">
            <div className="social__links  mb-4 mt-4 sm:mt-0 flex align-items-center gap-4 justify-content-end">
              <p className="m-0">Follow : </p>
              <span>
                <Link to="https://www.instagram.com/mandar_umare">
                  <FaInstagramSquare
                    size={25}
                    color={"#E1306C"}
                  ></FaInstagramSquare>
                </Link>
              </span>
              <span>
                <Link to="https://github.com/MandarUmare">
                  <FaGithub size={25} color={"black"}></FaGithub>
                </Link>
              </span>
              <span>
                <Link to="https://www.youtube.com/mandarumare">
                  <FaYoutube size={25} color={"red"}></FaYoutube>
                </Link>
              </span>
              <span>
                <Link to="www.linkedin.com/in/mandar-umare-80064521b">
                  <FaLinkedin size={25} color={"#4267B2"}></FaLinkedin>
                </Link>
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
