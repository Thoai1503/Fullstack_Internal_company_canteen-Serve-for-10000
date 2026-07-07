package tinhvomon.com.repository;

import java.time.LocalDateTime;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.microsoft.sqlserver.jdbc.SQLServerDataSource;

import tinhvomon.com.db.ConnectDataSource;
import tinhvomon.com.models.InventoryAudit;

@Repository
public class InventoryAuditRepository implements IRepo<InventoryAudit> {
    
	private SQLServerDataSource sqldts;

	public InventoryAuditRepository() {
		sqldts = ConnectDataSource.getDataSource();
	}
     
     
     
	
	@Override
	public InventoryAudit create(InventoryAudit e) throws Exception {
		
		String sql = "INSERT INTO InventoryAudit (ingredient_id, source_id, source_type, adjust_type, stock_adjust, old_stock, new_stock, unit_price, note) VALUES (?,?,?,?,?,?,?,?,?)";
		
		 try (var con = sqldts.getConnection();
		          var ps = con.prepareStatement(sql, java.sql.Statement.RETURN_GENERATED_KEYS)) {
				ps.setInt(1, e.getIngredient_id());
				ps.setInt(2, e.getSource_id());
				ps.setInt(3, e.getSource_type());
				ps.setInt(4, e.getAdjust_type());
				ps.setDouble(5, e.getStock_adjust());
				ps.setDouble(6, e.getOld_stock()!=null? e.getOld_stock():0.0);
				ps.setDouble(7, e.getNew_stock()!=null? e.getNew_stock():0.0);
				ps.setLong(8, e.getUnit_price());
				ps.setString(9, e.getNote());
				
				
				int rows = ps.executeUpdate();
		        System.out.println("Số dòng được chèn vào cơ sở dữ liệu: " + rows);
		        if (rows > 0) {
		            var keys = ps.getGeneratedKeys();
		            if (keys.next()) {
		                int id = keys.getInt(1);
		                e.setId(id);
		                
		                System.out.println("ID của bản ghi mới: " + id);
		            }
		            return e;
		        }
		 } catch (Exception ex) {
		     throw ex;
		 }
		
		
		return null;
	}

	@Override
	public InventoryAudit update(InventoryAudit e) {
		return null;
	}

	@Override
	public boolean delete(int id) {
		return false;
	}

	
	public HashSet<InventoryAudit> getAllWithParams(Integer page, Integer size, Integer ingredientId, Integer transactionType, Integer sourceType, String sortBy, String sortDir, String startDate, String endDate) {
		LocalDateTime now = LocalDateTime.now();
		LocalDateTime daysAgo = now.minusDays(7);
		
	    
		//String sql = "SELECT * FROM InventoryAudit WHERE  created_at BETWEEN ? AND ?";
	String sql = "SELECT IA.* FROM InventoryAudit IA  WHERE  created_at BETWEEN ? AND ?";
	 StringBuilder sb = new StringBuilder(sql);
	  
	   if (ingredientId != null && ingredientId > 0) {
		   System.out.println("ingredientId: " + ingredientId);
	        sb.append(" AND ingredient_id = ").append(ingredientId);
	    }
	    if (transactionType != null &&transactionType!=0 && transactionType > 0) {
	        sb.append(" AND adjust_type = ").append(transactionType.toString());
	    }
	    if (sourceType != null && sourceType!=0 && sourceType > 0) {
	        sb.append(" AND source_type = ").append(sourceType.toString());
	    }
	    
	    if (sortBy != null && !sortBy.isEmpty()) {
	        sb.append(" ORDER BY ").append(sortBy);
	        if (sortDir != null && !sortDir.isEmpty()) {
	            sb.append(" ").append(sortDir);
	        }
	    }
	    
	    if (page != null && size != null) {
	        int offset = page * size;
	        sb.append(" OFFSET ").append(offset).append(" ROWS FETCH NEXT ").append(size).append(" ROWS ONLY");
	    }
	    
	    sql = sb.toString();
	    System.out.println("SQL Query: " + sql);
		
		try (var con = sqldts.getConnection();
		          var ps = con.prepareStatement(sql)) {
		
			
			ps.setTimestamp(1, java.sql.Timestamp.valueOf(daysAgo));
			ps.setTimestamp(2, java.sql.Timestamp.valueOf(now));
			
			var rs = ps.executeQuery();
			var list = new HashSet<InventoryAudit>();
			while (rs.next()) {
				var item = new InventoryAudit();
				item.setId(rs.getInt("id"));
				item.setIngredient_id(rs.getInt("ingredient_id"));
				item.setSource_id(rs.getInt("source_id"));
				item.setSource_type(rs.getInt("source_type"));
				item.setAdjust_type(rs.getInt("adjust_type"));
				item.setStock_adjust(rs.getDouble("stock_adjust"));
				item.setOld_stock(rs.getDouble("old_stock"));
				item.setNew_stock(rs.getDouble("new_stock"));
				item.setUnit_price(rs.getLong("unit_price"));
				item.setNote(rs.getString("note"));
				item.setCreated_at(rs.getTimestamp("created_at").toLocalDateTime());
				
				list.add(item);
			}
			return list;
		} catch (Exception ex) {
		    ex.printStackTrace();
		}
		
		
	     
		
		
		return null;
	}

	@Override
	public InventoryAudit FindById(int id) {
		return null;
	}

	@Override
	public HashSet<InventoryAudit> FindByKeywork(String keywork) {
		return null;
	}




	@Override
	public HashSet<InventoryAudit> getAll() {
		// TODO Auto-generated method stub
		return null;
	}
	


}
