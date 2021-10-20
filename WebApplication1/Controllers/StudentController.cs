using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class StudentController : Controller
    {
        CrudDBEntities db = new CrudDBEntities();
        ReturnMSG R1 = new ReturnMSG();
        System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
        string cs = ConfigurationManager.ConnectionStrings["Conn"].ConnectionString;
        string sql = "";
        DataTable dt = new DataTable();
        DataSet ds = new DataSet();

        // GET: Student
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            try
            {
                var model = db.Students.ToList();
                var data = model;
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                R1.Status = 0;
                R1.Message = ex.Message;
                return Json(R1, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetbyID(int ID)
        {
            try
            {

                Student model = db.Students.Where(x => x.Id == ID).SingleOrDefault();
                string value = string.Empty;
                value = JsonConvert.SerializeObject(model, Formatting.Indented, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
                //var jsonAllData = JsonConvert.SerializeObject(value, Formatting.Indented);
                serializer.MaxJsonLength = Int32.MaxValue;
                dynamic MyList = serializer.Deserialize(value, typeof(object));
                var data = MyList;
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                R1.Status = 0;
                R1.Message = ex.Message;
                return Json(R1, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult Add(Student student)
        {

          
                try
                {

                    int i = 0;

                string MyPath = "~/Gallery/Image/";

                if (Request.Files["Image"] != null)
                {
                    string newFileName = DateTime.Now.ToString("yyyyMMddhhmmss") + "_";
                    HttpPostedFileBase PICURL = Request.Files["Image"];
                    string fileExtention = System.IO.Path.GetExtension(PICURL.FileName);
                    string FileName = newFileName + PICURL.FileName;
                    PICURL.SaveAs(HttpContext.Server.MapPath(MyPath) + FileName);
                    student.Image = FileName;
                }
                else
                {
                    student.Image = null;
                }
              

                Student obj = new Student();
                    obj.Name = student.Name;
                    obj.Address = student.Address;
                    obj.Gender = student.Gender;
                    obj.City = student.City;
                    obj.Mobile = student.Mobile;
                    obj.Image = student.Image;
                    obj.CreatedBy = "Admin";
                    obj.CreatedDate = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
                    db.Students.Add(obj);
                    i = db.SaveChanges();
                    if (i > 0) 
                    { 

                        R1.Status = 1;
                        R1.Message = "Record Inserted...";
                    }
                    else
                    {
                        R1.Status = 0;
                        R1.Message = "Error.";
                    }
                }
                catch (Exception ex)
                {
                    R1.Status = 0;
                    R1.Message = ex.Message;
                    return Json(R1, JsonRequestBehavior.AllowGet);

                }
          
            return Json(R1, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Student student)
        {
            try
            {
                int i = 0;
                Student obj = db.Students.SingleOrDefault(x => x.Id == student.Id);
                obj.Name = student.Name;
                obj.Address = student.Address;
                obj.Gender = student.Gender;
                obj.City = student.City;
                obj.Mobile = student.Mobile;
                i = db.SaveChanges();
                if (i > 0)
                {
                    R1.Status = 1;
                    R1.Message = "Record Updated...";
                }
                else
                {
                    R1.Status = 0;
                    R1.Message = "Error.";
                }
            }
            catch (Exception ex)
            {
                R1.Status = 0;
                R1.Message = ex.Message;
                return Json(R1, JsonRequestBehavior.AllowGet);

            }
            return Json(R1, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int Id)
        {
            int i = 0;
            Student obj = db.Students.SingleOrDefault(x => x.Id == Id);
            if (obj != null)
            {
                db.Students.Remove(obj);
                i = db.SaveChanges();
            }

            if (i > 0)
            {
                R1.Status = 1;
                R1.Message = "Record Deleted...";
            }
            else
            {
                R1.Status = 0;
                R1.Message = "Error.";
            }

            return Json(R1, JsonRequestBehavior.AllowGet);
        }
    }
}
