"use client";
import React from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import {
  Home,
  LayoutDashboard,
  Package,
  History,
  UtensilsCrossed,
  Users,
  Archive,
  FileText,
  Settings,
  User,
  LogOut,
  ChefHat,
  UserCog,
  PackageSearch,
} from "lucide-react";

interface SidebarProps {
  role: string;
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  console.log("Sidebar role: " + role);
  if (role.includes("chef")) {
    return (
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
        style={{ width: "280px", height: "100vh", position: "static" }}
      >
        <Link
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <ChefHat className="me-2" size={32} />
          <span className="fs-4 fw-bold">Chef Portal</span>
        </Link>
        <hr className="my-3" />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item mb-1">
            <Link
              href="/chef"
              className="nav-link active d-flex align-items-center"
              aria-current="page"
            >
              <Home className="me-2" size={18} />
              <span>Home</span>
            </Link>
          </li>
          <li className="mb-1">
            <Link
              href="/chef"
              className="nav-link text-white d-flex align-items-center"
            >
              <LayoutDashboard className="me-2" size={18} />
              <span>Bảng điều khiển</span>
            </Link>
          </li>
          <li className="mb-1">
            <Link
              href="/chef/inventory"
              className="nav-link text-white d-flex align-items-center"
            >
              <Package className="me-2" size={18} />
              <span>Quản lý kho nguyên liệu</span>
            </Link>
          </li>
        </ul>
        <hr className="my-3" />
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle py-2 px-2 rounded"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ transition: "background-color 0.2s" }}
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="36"
              height="36"
              className="rounded-circle me-2"
            />
            <div className="d-flex flex-column align-items-start">
              <strong className="mb-0">mdo</strong>
              <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                Chef
              </small>
            </div>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow w-100"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <a
                className="dropdown-item d-flex align-items-center py-2"
                href="#"
              >
                <FileText className="me-2" size={16} />
                <span>New project...</span>
              </a>
            </li>
            <li>
              <a
                className="dropdown-item d-flex align-items-center py-2"
                href="#"
              >
                <Settings className="me-2" size={16} />
                <span>Settings</span>
              </a>
            </li>
            <li>
              <a
                className="dropdown-item d-flex align-items-center py-2"
                href="#"
              >
                <User className="me-2" size={16} />
                <span>Profile</span>
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a
                className="dropdown-item d-flex align-items-center py-2 text-danger"
                href="#"
              >
                <LogOut className="me-2" size={16} />
                <span>Sign out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: "280px", height: "100vh", position: "static" }}
    >
      <Link
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <UserCog className="me-2" size={32} />
        <span className="fs-4 fw-bold">Admin Panel</span>
      </Link>
      <hr className="my-3" />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-1">
          <Link
            href="/admin"
            className="nav-link active d-flex align-items-center"
            aria-current="page"
          >
            <LayoutDashboard className="me-2" size={18} />
            <span>Bảng điều khiển</span>
          </Link>
        </li>
        <li className="mb-1">
          <Link
            href="/admin/order"
            className="nav-link text-white d-flex align-items-center"
          >
            <History className="me-2" size={18} />
            <span>Lịch sử đơn hàng</span>
          </Link>
        </li>
        <li className="mb-1">
          <Link
            href="/admin/food"
            className="nav-link text-white d-flex align-items-center"
          >
            <UtensilsCrossed className="me-2" size={18} />
            <span>Quản lý thực đơn</span>
          </Link>
        </li>
        <li className="mb-1">
          <a href="#" className="nav-link text-white d-flex align-items-center">
            <Users className="me-2" size={18} />
            <span>Quản lý khách hàng</span>
          </a>
        </li>
        <li className="mb-1">
          <Link
            href="/admin/inventory_history"
            className="nav-link text-white d-flex align-items-center"
          >
            <PackageSearch className="me-2" size={18} />
            <span>Quản lý kho</span>
          </Link>
        </li>
      </ul>
      <hr className="my-3" />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle py-2 px-2 rounded"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ transition: "background-color 0.2s" }}
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="36"
            height="36"
            className="rounded-circle me-2"
          />
          <div className="d-flex flex-column align-items-start">
            <strong className="mb-0">mdo</strong>
            <small className="text-muted" style={{ fontSize: "0.75rem" }}>
              Administrator
            </small>
          </div>
        </a>
        <ul
          className="dropdown-menu dropdown-menu-dark text-small shadow w-100"
          aria-labelledby="dropdownUser1"
        >
          <li>
            <a
              className="dropdown-item d-flex align-items-center py-2"
              href="#"
            >
              <FileText className="me-2" size={16} />
              <span>New project...</span>
            </a>
          </li>
          <li>
            <a
              className="dropdown-item d-flex align-items-center py-2"
              href="#"
            >
              <Settings className="me-2" size={16} />
              <span>Settings</span>
            </a>
          </li>
          <li>
            <a
              className="dropdown-item d-flex align-items-center py-2"
              href="#"
            >
              <User className="me-2" size={16} />
              <span>Profile</span>
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a
              className="dropdown-item d-flex align-items-center py-2 text-danger"
              href="#"
            >
              <LogOut className="me-2" size={16} />
              <span>Sign out</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
