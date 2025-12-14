package tinhvomon.com.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashSet;

import org.springframework.stereotype.Repository;

import com.microsoft.sqlserver.jdbc.SQLServerDataSource;

import tinhvomon.com.db.ConnectDataSource;
import tinhvomon.com.models.FoodIngredient;

@Repository
public class FoodIngredientRepository implements IRepo<FoodIngredient> {

	private SQLServerDataSource sqldts;
	 
	 public FoodIngredientRepository() {
		 sqldts = ConnectDataSource.getDataSource();
	 }
	
	@Override
	public FoodIngredient create(FoodIngredient e) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FoodIngredient update(FoodIngredient e) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(int id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public HashSet<FoodIngredient> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FoodIngredient FindById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public HashSet<FoodIngredient> FindByKeywork(String keywork) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public HashSet<FoodIngredient> FindByFoodIdInCart(int food_id,int cart_item_quantity) {
		HashSet<FoodIngredient> list = new HashSet<>();
		String sql = "select * from FoodIngredients where food_id =?";
		try(Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
			ps.setInt(1, food_id);
			
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()) {
				var item = new FoodIngredient();
				item.setFood_id(rs.getInt("food_id"));
				item.setIngredient_id(rs.getInt("ingredient_id"));
				item.setRecipe_quantity(rs.getDouble("recipe_quantity"));
				item.setQuantity(rs.getDouble("recipe_quantity")*cart_item_quantity);
				item.setUnit_id(rs.getInt("unit_id"));
				list.add(item);
			}
			return list;
		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
		
		return null;
	}

}
