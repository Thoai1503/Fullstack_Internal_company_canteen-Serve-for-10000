package tinhvomon.com.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.microsoft.sqlserver.jdbc.SQLServerDataSource;

import tinhvomon.com.db.ConnectDataSource;
import tinhvomon.com.models.CartItem;
import tinhvomon.com.models.FoodIngredient;
import tinhvomon.com.models.IngredientInventory;
import tinhvomon.com.models.Units;


@Repository
public class IngredientInventoryRepository implements IRepo<IngredientInventory> {

	
	private SQLServerDataSource sqldts;
	private FoodIngredientRepository foodIngredientRepository;
	 
	 public IngredientInventoryRepository(FoodIngredientRepository foodIngredientRepository) {
		 sqldts = ConnectDataSource.getDataSource();
		 this.foodIngredientRepository=foodIngredientRepository;
	 }
	
	@Override
	public IngredientInventory create(IngredientInventory e) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public IngredientInventory update(IngredientInventory e) {
		// TODO Auto-generated method stub
		return null;
	}
	public Double updateStock(int id,Double stock) {
		String sql = "update IngredientInventory set stock = ? where id = ?";
		
		try(Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
			ps.setDouble(1, stock);
			ps.setInt(2, id);
			
			int row = ps.executeUpdate();
		    System.out.println("Số dòng được cập nhật vào cơ sở dữ liệu: " + row);
			if(row>0) {
				return stock;
			}
			
		}catch(Exception  ex)
		{
			ex.printStackTrace();
		}
		return null;
	}

	@Override
	public boolean delete(int id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public HashSet<IngredientInventory> getAll() {
	   String sql= "select ii.id,ii.base_unit_id,ii.name,ii.stock,ii.price_per_unit,u.name as unit_name,u.conversion_factor from IngredientInventory ii inner join Units u on ii.base_unit_id = u.id";
	   	HashSet<IngredientInventory> list = new HashSet<IngredientInventory>();
	   
	   try(Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
		   
		    ResultSet rs = ps.executeQuery();
		    while(rs.next()) {
		    	var unit= new Units();
		    	unit.setName(rs.getString("unit_name"));
		    	unit.setConversion_factor(rs.getDouble("conversion_factor"));
		    	var item = new IngredientInventory();
		    	item.setId(rs.getInt("id"));
		    	item.setBase_unit_id(rs.getInt("base_unit_id"));
		    	item.setName(rs.getString("name"));
		    	item.setStock(rs.getDouble("stock"));
		    	item.setPrice_per_unit(rs.getDouble("price_per_unit"));
		    	item.setUnits(unit);
		    	list.add(item);
		    	
		    }
		    return list;
		   
		   
		   
	   }
	   catch (Exception ex) {
		   ex.printStackTrace();
	   }
	   
	   
	   
		return null;
	}

	
	public List<IngredientInventory> getAllList() {
		   String sql= "select ii.id,ii.base_unit_id,ii.name,ii.stock,ii.price_per_unit,u.name as unit_name,u.conversion_factor from IngredientInventory ii inner join Units u on ii.base_unit_id = u.id";
		   List<IngredientInventory> list = new ArrayList<IngredientInventory>();
		   
		   try(Connection con = sqldts.getConnection();
			          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
			   
			    ResultSet rs = ps.executeQuery();
			    while(rs.next()) {
			    	var unit= new Units();
			    	unit.setName(rs.getString("unit_name"));
			    	unit.setConversion_factor(rs.getDouble("conversion_factor"));
			    	var item = new IngredientInventory();
			    	item.setId(rs.getInt("id"));
			    	item.setBase_unit_id(rs.getInt("base_unit_id"));
			    	item.setName(rs.getString("name"));
			    	item.setStock(rs.getDouble("stock"));
			    	item.setPrice_per_unit(rs.getDouble("price_per_unit"));
			    	item.setUnits(unit);
			    	list.add(item);
			    	
			    }
			    return list;
			   
			   
			   
		   }
		   catch (Exception ex) {
			   ex.printStackTrace();
		   }
		   
		   
		   
			return null;
		}

	@Override
	public IngredientInventory FindById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public HashSet<IngredientInventory> FindByKeywork(String keywork) {
		// TODO Auto-generated method stub
		return null;
	}
	public boolean IsOutOfStock(int id, Double quantity) {
		var list =this.getAllList();
		for (IngredientInventory item :list) {
			if(item.getId()== id&&  quantity> item.getStock()) {
				return true;
			}
		}
		return false;
	}
	public HashSet<FoodIngredient> ExtractToFoodIngredient(int food_id,int cart_item_quantity){
		return foodIngredientRepository.FindByFoodIdInCart(food_id,cart_item_quantity);
	}
	
	
	
	public  ArrayList<Integer> CheckingStock(HashSet<CartItem> list) {
		HashSet<FoodIngredient> ingredientList = new HashSet<>();
		for(CartItem item :list) {
			ingredientList.addAll(ExtractToFoodIngredient(item.getFood_id(),item.getQuantity()));
		}
		
		ArrayList<Integer> food_id_array = new ArrayList<>();
		for(FoodIngredient foodIngre : ingredientList )  {
			System.out.println("Quantity: " +foodIngre.getQuantity() + " Ingredient id: "+foodIngre.getIngredient_id());
			var isOut =IsOutOfStock(foodIngre.getIngredient_id(), foodIngre.getQuantity());
			System.out.println("Is out stock: " +isOut);
			if(isOut) {
				food_id_array.add(foodIngre.getFood_id());
			}
		}
		return food_id_array;
	}
	
	public boolean  abstractStock(int food_id, Double quantity) {
		
		 String sql = "update IngredientInventory set stock -= ? where id =?";
		 try(Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
			 ps.setDouble(1, quantity);
			 
		 }catch(Exception ex) {
			 ex.printStackTrace();
		 }
		 return false;
		
	}

}
