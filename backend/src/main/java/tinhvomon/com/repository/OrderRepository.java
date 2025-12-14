package tinhvomon.com.repository;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import tinhvomon.com.controller.CartController;
import com.microsoft.sqlserver.jdbc.SQLServerDataSource;

import tinhvomon.com.db.ConnectDataSource;
import tinhvomon.com.models.CancellationRequest;
import tinhvomon.com.models.CartItem;
import tinhvomon.com.models.FoodItem;
import tinhvomon.com.models.Order;
import tinhvomon.com.models.ProcedureRespone;
import tinhvomon.com.models.User;

@Repository
public class OrderRepository implements IRepo<Order> {

    private final CartController cartController;

	 private SQLServerDataSource sqldts;
	 public OrderRepository (CartController cartController) {
		 sqldts = ConnectDataSource.getDataSource();
		 this.cartController = cartController;
	 }
	@Override
	public Order create(Order e) throws Exception {
	 String sql ="insert into Orders (user_id,total_amount,discount,status) values (?,?,?,?)";
		try (Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
			ps.setInt(1, e.getUser_id());
			ps.setDouble(2, e.getTotal_amount());
			ps.setDouble(3, 0);
			ps.setInt(4, 1);
			
			  int rows = ps.executeUpdate();
		         System.out.println("Số dòng được chèn vào cơ sở dữ liệu: " + rows);
		         if (rows > 0) {
		             ResultSet keys = ps.getGeneratedKeys();
		             if (keys.next()) {
		                 int id = keys.getInt(1);
		                 e.setId(id);
		                 
		                 System.out.println("ID của bản ghi mới: " + id);
		             }
		             return e;
		         }
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}

	@Override
	public Order update(Order e) {
		
 String sql ="UPDATE Orders SET status = ?, cancellation_status=? WHERE id = ? ";
		 System.out.println(" Order status: "+ e.getStatus());
		 try (Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
	 
			 ps.setInt(1, e.getStatus());
			 ps.setInt(2, e.getCancellation_status().getCancellation_status());
			 ps.setInt(3, e.getId());
			 
			  int rows = ps.executeUpdate();
		         System.out.println("Số dòng được chèn vào cơ sở dữ liệu: " + rows);
		         if (rows > 0) {
		   
		        	 
		       
		             return e;
		         }
			 
			 return null;
		 }
		 catch(Exception ex) {
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
	public HashSet<Order> getAll() {
		String sql ="select o.cancel_reason,o.id,o.total_amount,o.status,o.user_id,o.created_at,o.cancellation_admin_note,o.cancellation_processed_by,o.cancellation_processed_date,o.cancellation_request_date,o.cancellation_request_reason,o.cancellation_status,us.email from Orders o inner join Users us on o.user_id = us.id order by o.created_at desc";
        HashSet<Order> list =new HashSet<Order>();
		try (Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
	
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				Order ord = new Order();
				User user = new User();
				user.setEmail(rs.getString("email"));
				ord.setId(rs.getInt("id"));
				ord.setUser_id(rs.getInt("user_id"));
					ord.setTotal_amount(rs.getDouble("total_amount"));
					ord.setStatus(rs.getInt("status"));
					ord.setCreated_at(rs.getTimestamp("created_at").toLocalDateTime());
			
			        ord.setUser(user);
			    	ord.setId(rs.getInt("id"));
			
					
					
				       ord.setCancellation_status(new CancellationRequest(rs.getInt("cancellation_status"),rs.getString("cancellation_request_reason"),rs.getInt("cancellation_processed_by"),rs.getString("cancellation_admin_note")));
		
	
				list.add(ord);
				
			}
			return list;
			 
		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}
	
	public List<Order> findAllList(
		    LocalDateTime start_date,
		    LocalDateTime end_date,
		    Double min_amount,
		    Double max_amount,
		    String sort_by,
		    String sort_order,
		    String status
		) {
	  	System.out.println("Repository Method Called with Parameters:");
	  	System.out.println("start_date: " + start_date);
    	System.out.println("end_date: " + end_date);
    	System.out.println("min_amount: " + min_amount);
    	System.out.println("max_amount: " + max_amount);
    	System.out.println("sort_by: " + sort_by);
    	System.out.println("sort_order: " + sort_order);
    	System.out.println("status: " + status);
		    StringBuilder sql = new StringBuilder(
		        "SELECT o.cancel_reason, o.id, o.total_amount, o.status, o.user_id, o.created_at, " +
		        "o.cancellation_admin_note, o.cancellation_processed_by, o.cancellation_processed_date, " +
		        "o.cancellation_request_date, o.cancellation_request_reason, o.cancellation_status, " +
		        "us.email " +
		        "FROM Orders o " +
		        "INNER JOIN Users us ON o.user_id = us.id " +
		        "WHERE 1=1 "
		    );
		    
		    List<Object> params = new ArrayList<>();
		    
		    // Add filters
		    if (start_date != null) {
		        sql.append("AND o.created_at >= ? ");
		        params.add(Timestamp.valueOf(start_date));
		    }
		    
		    if (end_date != null) {
		        sql.append("AND o.created_at <= ? ");
		        params.add(Timestamp.valueOf(end_date));
		    }
		    
		    if (min_amount != null) {
		        sql.append("AND o.total_amount >= ? ");
		        params.add(min_amount);
		    }
		    
		    if (max_amount != null) {
		        sql.append("AND o.total_amount <= ? ");
		        params.add(max_amount);
		    }
		    
		    if (status != null && !status.equals("all")) {
		        sql.append("AND o.status = ? ");
		        params.add(Integer.parseInt(status));
		    }
		    
		    // Add sorting
		    String sortColumn = sort_by.equals("amount") ? "o.total_amount" : "o.created_at";
		    String sortDirection = sort_order.equalsIgnoreCase("desc") ? "DESC" : "ASC";
		    sql.append("ORDER BY ").append(sortColumn).append(" ").append(sortDirection);
		    
		    List<Order> list = new ArrayList<>();
		    
		    try (Connection con = sqldts.getConnection();
		         PreparedStatement ps = con.prepareStatement(sql.toString())) {
		        
		        // Set parameters
		        for (int i = 0; i < params.size(); i++) {
		            ps.setObject(i + 1, params.get(i));
		        }
		        
		        ResultSet rs = ps.executeQuery();
		        
		        while (rs.next()) {
		            Order ord = new Order();
		            User user = new User();
		            
		            user.setEmail(rs.getString("email"));
		            
		            ord.setId(rs.getInt("id"));
		            ord.setUser_id(rs.getInt("user_id"));
		            ord.setTotal_amount(rs.getDouble("total_amount"));
		            ord.setStatus(rs.getInt("status"));
		            
		            Timestamp createdAt = rs.getTimestamp("created_at");
		            if (createdAt != null) {
		                ord.setCreated_at(createdAt.toLocalDateTime());
		            }
		            
		            ord.setUser(user);
		            
		            // Handle cancellation info
		            int cancellationStatus = rs.getInt("cancellation_status");
		            String cancellationReason = rs.getString("cancellation_request_reason");
		            int processedBy = rs.getInt("cancellation_processed_by");
		            String adminNote = rs.getString("cancellation_admin_note");
		            
		            ord.setCancellation_status(new CancellationRequest(
		                cancellationStatus, 
		                cancellationReason, 
		                processedBy, 
		                adminNote
		            ));
		            
		            list.add(ord);
		        }
		        
		        return list;
		        
		    } catch (Exception ex) {
		        ex.printStackTrace();
		    }
		    
		    return null;
		}
	
	public List<Order> getAllList() {
		String sql ="select o.cancel_reason,o.id,o.total_amount,o.status,o.user_id,o.created_at,o.cancellation_admin_note,o.cancellation_processed_by,o.cancellation_processed_date,o.cancellation_request_date,o.cancellation_request_reason,o.cancellation_status,us.email from Orders o inner join Users us on o.user_id = us.id order by o.created_at desc";
		StringBuilder sql2 = new StringBuilder(
		        "SELECT o.cancel_reason, o.id, o.total_amount, o.status, o.user_id, o.created_at, " +
		        "o.cancellation_admin_note, o.cancellation_processed_by, o.cancellation_processed_date, " +
		        "o.cancellation_request_date, o.cancellation_request_reason, o.cancellation_status, " +
		        "us.email " +
		        "FROM Orders o " +
		        "INNER JOIN Users us ON o.user_id = us.id " +
		        "WHERE 1=1 "
		    );
   List<Order> list =new ArrayList<Order>();
		try (Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
	
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				Order ord = new Order();
				User user = new User();
				user.setEmail(rs.getString("email"));
				ord.setId(rs.getInt("id"));
				ord.setUser_id(rs.getInt("user_id"));
					ord.setTotal_amount(rs.getDouble("total_amount"));
					ord.setStatus(rs.getInt("status"));
					ord.setCreated_at(rs.getTimestamp("created_at").toLocalDateTime());
			
			        ord.setUser(user);
			    	ord.setId(rs.getInt("id"));
			
					
					
				       ord.setCancellation_status(new CancellationRequest(rs.getInt("cancellation_status"),rs.getString("cancellation_request_reason"),rs.getInt("cancellation_processed_by"),rs.getString("cancellation_admin_note")));
		
	
				list.add(ord);
				
			}
			return list;
			 
		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}

	@Override
	public Order FindById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public HashSet<Order> FindByKeywork(String keywork) {
		// TODO Auto-generated method stub
		return null;
	}
	public Order FindPendingByUserId(int user_id) {
		String sql ="select * from Orders where status = 1 AND user_id=?";
		Order ord = new Order();
		try (Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
			ps.setInt(1, user_id);
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
			
				ord.setId(rs.getInt("id"));
				ord.setUser_id(user_id);
				ord.setTotal_amount(rs.getDouble("total_amount"));
				ord.setStatus(rs.getInt("status"));
				
			
				return ord;
			}
			return ord;
			
		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}

	public HashSet< Order> FindByUserId(int user_id) {
		String sql ="select * from Orders  where user_id=? order by created_at desc";
         HashSet<Order> list =new HashSet<Order>();
		try (Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
			ps.setInt(1, user_id);
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				Order ord = new Order();
				ord.setId(rs.getInt("id"));
				ord.setUser_id(user_id);
					ord.setTotal_amount(rs.getDouble("total_amount"));
					ord.setStatus(rs.getInt("status"));
					ord.setCreated_at(rs.getTimestamp("created_at").toLocalDateTime());
				
			       ord.setCancellation_status(new CancellationRequest(rs.getInt("cancellation_status"),rs.getString("cancellation_request_reason"),rs.getInt("cancellation_processed_by"),rs.getString("cancellation_admin_note")));
	
				list.add(ord);
				
			}
			return list;
			 
		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}
	
	public List< Order> FindByUserIdList(int user_id) {
		String sql ="select * from Orders  where user_id=? order by created_at desc";
         List<Order> list =new ArrayList<Order>();
		try (Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
			ps.setInt(1, user_id);
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				Order ord = new Order();
				ord.setId(rs.getInt("id"));
				ord.setUser_id(user_id);
					ord.setTotal_amount(rs.getDouble("total_amount"));
					ord.setStatus(rs.getInt("status"));
					ord.setCreated_at(rs.getTimestamp("created_at").toLocalDateTime());
				
			       ord.setCancellation_status(new CancellationRequest(rs.getInt("cancellation_status"),rs.getString("cancellation_request_reason"),rs.getInt("cancellation_processed_by"),rs.getString("cancellation_admin_note")));
	
				list.add(ord);
				
			}
			return list;
			 
		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}
	
	
	
	
	
	public boolean updateCancellationRequest(CancellationRequest cancelationRequest,int id) {
		
		String sql = "update Orders set cancellation_status=?,cancellation_request_reason=?,cancellation_request_date=?,cancellation_processed_by=?,cancellation_processed_date=?,cancellation_admin_note=? where id =?";
		try(Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
			ps.setInt(1, cancelationRequest.getCancellation_status());
			ps.setString(2, cancelationRequest.getCancellation_request_reason());
			if (cancelationRequest.getCancellation_request_date() != null) {
			    ps.setTimestamp(3, Timestamp.valueOf(cancelationRequest.getCancellation_request_date()));
			} else {
			    ps.setNull(3, java.sql.Types.TIMESTAMP);
			}
			
			
			ps.setInt(4, cancelationRequest.getCancellation_processed_by());
			
			if (cancelationRequest.getCancellation_processed_date() != null) {
			    ps.setTimestamp(5, Timestamp.valueOf(cancelationRequest.getCancellation_processed_date()));
			} else {
			    ps.setNull(5, java.sql.Types.TIMESTAMP);
			}
			ps.setString(6, cancelationRequest.getCancellation_admin_note());
			
			ps.setInt(7,id);
			int rows =ps.executeUpdate();
			if(rows >0) {
				return true;
			}
			return false;
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
		return false;
	}
public CancellationRequest updateCancellationProcess(CancellationRequest cancelationRequest,int id) {
		
		String sql = "update Orders set  cancellation_status=?,cancellation_processed_by=?,cancellation_processed_date=?,cancellation_admin_note=?,status=? where id =?";
		try(Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
			ps.setInt(1, cancelationRequest.getCancellation_status());
			ps.setInt(2, cancelationRequest.getCancellation_processed_by());

			    ps.setTimestamp(3, Timestamp.valueOf(cancelationRequest.getCancellation_processed_date()));
		
			    
			    
			    if(cancelationRequest.getCancellation_admin_note()!=null) {
					ps.setString(4, cancelationRequest.getCancellation_admin_note());}
			    else {
			    	ps.setNull(4, java.sql.Types.NVARCHAR);
			    }
			ps.setInt(5, cancelationRequest.getStatus());
			ps.setInt(6,id);
			int rows =ps.executeUpdate();
			if(rows >0) {
				return cancelationRequest;
			}
			return null;
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}


public List<Order> getAllForDashBoard() {
	String sql ="select o.cancel_reason,o.id,o.total_amount,o.status,o.user_id,o.created_at,o.cancellation_admin_note,o.cancellation_processed_by,o.cancellation_processed_date,o.cancellation_request_date,o.cancellation_request_reason,o.cancellation_status,us.email from Orders o inner join Users us on o.user_id = us.id order by o.created_at desc";
List<Order> list =new ArrayList<Order>();
	try (Connection con = sqldts.getConnection();
	          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){

		ResultSet rs = ps.executeQuery();
		while(rs.next()) {
			Order ord = new Order();
			User user = new User();
			user.setEmail(rs.getString("email"));
			ord.setId(rs.getInt("id"));
			ord.setUser_id(rs.getInt("user_id"));
				ord.setTotal_amount(rs.getDouble("total_amount"));
				ord.setStatus(rs.getInt("status"));
				ord.setCreated_at(rs.getTimestamp("created_at").toLocalDateTime());
		
		        ord.setUser(user);
		    	ord.setId(rs.getInt("id"));
		
				
				
			       ord.setCancellation_status(new CancellationRequest(rs.getInt("cancellation_status"),rs.getString("cancellation_request_reason"),rs.getInt("cancellation_processed_by"),rs.getString("cancellation_admin_note")));
	

			list.add(ord);
			
		}
		return list;
		 
	}
	catch (Exception ex) {
		ex.printStackTrace();
	}
	return null;
}

public List<Order> getCompletedAllForDashBoard() {
	String sql ="select o.cancel_reason,o.id,o.total_amount,o.status,o.user_id,o.created_at,o.cancellation_admin_note,o.cancellation_processed_by,o.cancellation_processed_date,o.cancellation_request_date,o.cancellation_request_reason,o.cancellation_status,us.email from Orders o inner join Users us on o.user_id = us.id where status = 2 order by o.created_at desc";
List<Order> list =new ArrayList<Order>();
	try (Connection con = sqldts.getConnection();
	          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){

		ResultSet rs = ps.executeQuery();
		while(rs.next()) {
			Order ord = new Order();
			User user = new User();
			user.setEmail(rs.getString("email"));
			ord.setId(rs.getInt("id"));
			ord.setUser_id(rs.getInt("user_id"));
				ord.setTotal_amount(rs.getDouble("total_amount"));
				ord.setStatus(rs.getInt("status"));
				ord.setCreated_at(rs.getTimestamp("created_at").toLocalDateTime());
		
		        ord.setUser(user);
		    	ord.setId(rs.getInt("id"));
		
				
				
			       ord.setCancellation_status(new CancellationRequest(rs.getInt("cancellation_status"),rs.getString("cancellation_request_reason"),rs.getInt("cancellation_processed_by"),rs.getString("cancellation_admin_note")));
	

			list.add(ord);
			
		}
		return list;
		 
	}
	catch (Exception ex) {
		ex.printStackTrace();
	}
	return null;
}
public List<Order> getCancelledAllForDashBoard() {
	String sql ="select o.cancel_reason,o.id,o.total_amount,o.status,o.user_id,o.created_at,o.cancellation_admin_note,o.cancellation_processed_by,o.cancellation_processed_date,o.cancellation_request_date,o.cancellation_request_reason,o.cancellation_status,us.email from Orders o inner join Users us on o.user_id = us.id where status = 3 order by o.created_at desc";
List<Order> list =new ArrayList<Order>();
	try (Connection con = sqldts.getConnection();
	          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){

		ResultSet rs = ps.executeQuery();
		while(rs.next()) {
			Order ord = new Order();
			User user = new User();
			user.setEmail(rs.getString("email"));
			ord.setId(rs.getInt("id"));
			ord.setUser_id(rs.getInt("user_id"));
				ord.setTotal_amount(rs.getDouble("total_amount"));
				ord.setStatus(rs.getInt("status"));
				ord.setCreated_at(rs.getTimestamp("created_at").toLocalDateTime());
		
		        ord.setUser(user);
		    	ord.setId(rs.getInt("id"));
		
				
				
			       ord.setCancellation_status(new CancellationRequest(rs.getInt("cancellation_status"),rs.getString("cancellation_request_reason"),rs.getInt("cancellation_processed_by"),rs.getString("cancellation_admin_note")));
	

			list.add(ord);
			
		}
		return list;
		 
	}
	catch (Exception ex) {
		ex.printStackTrace();
	}
	return null;
}


public Map<String,Integer> getRevenueStatistics() {
	String sql ="SELECT FORMAT(created_at, 'yyyy-MM-dd') AS Date, SUM(total_amount) AS TotalRevenue \r\n"
			+ "		FROM Orders \r\n"
			+ "			WHERE status = 2 \r\n"
			+ "			GROUP BY FORMAT(created_at, 'yyyy-MM-dd') \r\n"
			+ "			ORDER BY Date DESC";
	Map<String,Integer> revenueMap = new java.util.LinkedHashMap<>();
		try (Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
	
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				String month = rs.getString("Date");
				int totalRevenue = rs.getInt("TotalRevenue");
				revenueMap.put(month, totalRevenue);
			}
			return revenueMap;
			 
		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}

public Map<String,Integer> getRevenueByFoodType(){
	String sql ="select ft.name , SUM(total_price) as total from OrderItems o join FoodItems f on o.food_id = f.id join  FoodType ft on ft.id = f.type_id group by ft.name";
	Map<String,Integer> revenueMap = new java.util.LinkedHashMap<>();
		try (Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
	
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				String typeName = rs.getString("name");
				int totalRevenue = rs.getInt("total");
				revenueMap.put(typeName, totalRevenue);
			}
			return revenueMap;
			 
		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
		}


public ProcedureRespone RequestOrderCancellation(int order_id,int user_id, String reason) {
	String sql ="EXECUTE sp_RequestOrderCancellation ?,?,?";
	ProcedureRespone respone = new ProcedureRespone();
		try (Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
			ps.setInt(1, order_id);
			ps.setInt(2, user_id);
			ps.setString(3, reason);
			ResultSet rs = ps.executeQuery();
			if(rs.next()) {
				respone.setCode(rs.getInt("Result"));
				respone.setMessage(rs.getString("Message"));
				return respone;
			}
			return respone;
			 
		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}
public ProcedureRespone ProcessOrderCancellation(int order_id,int admin_id,int approve_status, String reason) {
	String sql ="EXECUTE sp_ProcessCancellationRequest ?,?,?,?";
	ProcedureRespone respone = new ProcedureRespone();
		try (Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
			ps.setInt(1, order_id);
			ps.setInt(2, admin_id);
			ps.setInt(3, approve_status);
			ps.setString(4, reason);
			ResultSet rs = ps.executeQuery();
			if(rs.next()) {
				respone.setCode(rs.getInt("Result"));
				respone.setMessage(rs.getString("Message"));
				return respone;
			}
			return respone;
			 
		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}
	
}
