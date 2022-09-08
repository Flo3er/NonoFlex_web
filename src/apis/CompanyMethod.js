import Instance from "./ApiInstance";

// company 생성
export const CompanyPost = async(name, type, category) => {
  try {
    const response = await Instance.post("/api/v1/company", {
        name: name,
        type: type,
        category: category,
    });
    console.log(response.data);
    return response.data.companyList;
  } catch (error) {
    console.log(error);
  }
}

// company 조회
export const CompanyGet = async () => {
  try {
    const response = await Instance.get("/api/v1/company");
    console.log(response.data.companyList);
    return response.data.companyList;
  } catch (error) {
    console.log(error);
  }
};

// company 수정
async function CompanyPut(companyId, name, type, category, active) {
  try {
    const response = await Instance.put(`/api/v1/company/${companyId}`, {
        name: name,
        type: type,
        category: category,
        active: active
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// company 삭제
async function CompanyDelete(companyId) {
  try {
    const response = await Instance.delete(`/api/v1/company/${companyId}`, {});
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const CompanyMethod = {
    CompanyPost,
    CompanyGet,
    CompanyPut,
    CompanyDelete
};

export default CompanyMethod;
