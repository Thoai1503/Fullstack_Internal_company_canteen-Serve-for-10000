import { FoodItem } from "@/types/foodItem";
import "aos/dist/aos.css";
import FoodItems from "./client/home/FoodItems";

interface MenuSectionProps {
  foods: any;
  typeSlugList: { slug: string; type_id: number; type_name: string }[];
  user_id: number;
}

export default function MenuSection({
  foods,
  typeSlugList,
  user_id,
}: MenuSectionProps) {
  const renderMenuItems = (items: FoodItem[]) =>
    items.map((item, idx) => (
      <FoodItems item={item} idx={idx} user_id={user_id} />
    ));

  return (
    <section id="menu" className="menu section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Our Menu</h2>
        <p>
          <span>Thực Đơn</span>{" "}
          <span className="description-title">Hôm Nay</span>
        </p>
      </div>

      <div className="container">
        <ul
          className="nav nav-tabs d-flex justify-content-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {typeSlugList.map((tab, i) => (
            <li key={tab.type_id} className="nav-item">
              <a
                className={`nav-link ${i === 0 ? "active show" : ""}`}
                data-bs-toggle="tab"
                data-bs-target={`#menu-${tab.slug}`}
              >
                <h4>
                  {tab.type_name.charAt(0).toUpperCase() +
                    tab.type_name.slice(1)}
                </h4>
              </a>
            </li>
          ))}
        </ul>

        <div className="tab-content" data-aos="fade-down" data-aos-delay="100">
          {Object.entries(foods).map(
            ([key, items]: [key: any, item: any], i) => (
              <div
                key={key}
                className={`tab-pane fade ${i === 0 ? "active show" : ""}`}
                id={`menu-${key.trim()}`}
              >
                <div className="tab-header text-center">
                  <p>Menu</p>
                  <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                </div>
                <div className="row gy-5">{renderMenuItems(items)}</div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
