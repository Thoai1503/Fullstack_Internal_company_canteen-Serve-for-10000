"use server";

import "aos/dist/aos.css";
import { API_URL, INTERNAL_API } from "@/helper/api";
import MenuSection from "@/components/MenuSection";
import HeroSection from "@/components/client/HeroSection";
import { cookies } from "next/headers";
import axios from "axios";
import { FoodItem } from "@/types/foodItem";
import Script from "next/script";
import { CartItem } from "@/types/cartItem";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user_id = Number(cookieStore.get("user")?.value);
  console.log("User id:" + user_id);
  console.log("Url :" + API_URL);
  if (!user_id) {
    return redirect("/login");
  }

  const { data: cartItems } = await axios.get<CartItem[]>(
    `${INTERNAL_API}/cartitem/user/${user_id}`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  );

  const { data: foods } = await axios.get<FoodItem[]>(`${API_URL}/fooditem`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  const foodList = foods.map((item) => {
    const cartItem = cartItems.find((c) => c.food.id == item.id);
    if (!cartItem) {
      return { ...item, inCart: false, cart: { id: 0, quantity: 0 } };
    }
    return {
      ...item,
      inCart: true,
      cart: { id: cartItem.id, quantity: cartItem.quantity },
    };
  }) as FoodItem[];

  const grouped = foods.reduce((acc: any, item) => {
    if (!acc[item.slug]) acc[item.slug] = [];
    acc[item.slug].push(item);
    return acc;
  }, {});

  const uniqueList = [
    ...new Map(
      foodList.map((item) => [
        `${item.slug.trim()}-${item.type_id}`,
        {
          slug: item.slug.trim(),
          type_id: item.type_id,
          type_name: item.type_name,
        },
      ])
    ).values(),
  ];

  const groupedBySlug = uniqueList.reduce(
    (acc: Record<string, FoodItem[]>, item) => {
      acc[item.slug] = foodList.filter(
        (food) => food.slug.trim() === item.slug.trim()
      );
      return acc;
    },
    {}
  );

  console.log("Slugs: " + JSON.stringify(cartItems));
  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/glightbox/3.2.0/js/glightbox.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/purecounterjs@1.5.0/dist/purecounter_vanilla.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />
      <HeroSection />

      {/* TODO: Menu section, Testimonials, ... */}
      <MenuSection
        foods={groupedBySlug}
        typeSlugList={uniqueList}
        user_id={user_id}
      />
    </>
  );
}
