import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../assets/images/male.png";
import ButtonIcon from "../components/Attributes/ButtonIcon";
import InputText from "../components/Attributes/InputText";
import { INITIAL_GENDER, USER_GENDER, USER_ROLE } from "../constants/useConstant";
import {
  userProfileAction,
  userProfileUpdateAction,
} from "../store/actions/userActions";

function Profile() {
  const dispatch = useDispatch();
  const [isChange, setIsChange] = useState(false);
  const userProfile = useSelector((state) => state.userProfile);
  const { userInfo } = userProfile;
  const [profile, setProfile] = useState({
    name: "",
    gender: "",
    address: "",
    birthday: "",
    phone: "",
  });
  const submitEdit = (e) => {
    e.preventDefault();
    dispatch(userProfileUpdateAction(userInfo.id, profile));
    dispatch(userProfileAction());
    setIsChange(!isChange);
  };
  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);
  const handleChange = () => {
    setIsChange(!isChange);
    if (userInfo) {
      setProfile({
        name: userInfo.name,
        gender: userInfo.gender,
        address: userInfo.address,
        birthday: userInfo.birthday,
        phone: userInfo.phone,
      });
    }
  };
  return (
    <>
      {userInfo && (
        <div className="w-11/12 mx-auto bg-white shadow-2xl rounded-lg border border-slate-300 px-10 mt-10">
          <h1 className="py-3 text-3xl bold my-3">About Me</h1>
          <div className="flex flex-auto h-96">
            <div className="w-80">
              <img src={avatar} alt="" />
            </div>
            <div className="ml-10">
              <table className="table-auto w-full">
                <tbody>
                  <tr>
                    <td className="px-4 py-1 capitalize font-bold text-black">
                      Name:
                    </td>
                    <td className="px-4 py-1 text-black">{userInfo.name}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 capitalize font-bold text-black">
                      Gender
                    </td>
                    <td className="px-4 py-1 text-black">
                      {USER_GENDER[USER_ROLE.gender]}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 capitalize font-bold text-black">
                      Date of birth:
                    </td>
                    <td className="px-4 py-1 text-black">
                      {new Date(userInfo.birthday).toLocaleString("en-US")}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 capitalize font-bold text-black">
                      Address:
                    </td>
                    <td className="px-4 py-1 text-black">{userInfo.address}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 capitalize font-bold text-black">
                      Phone:
                    </td>
                    <td className="px-4 py-1 text-black">{userInfo.phone}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 capitalize font-bold text-black">
                      Email:
                    </td>
                    <td className="px-4 py-1 text-black">{userInfo.email}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 capitalize font-bold text-black">
                      Department:
                    </td>
                    <td className="px-4 py-1 text-black">
                      {userInfo.department}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 capitalize font-bold text-black">
                      Role:
                    </td>
                    <td className="px-4 py-1 text-black">
                      {USER_ROLE[userInfo.role_id]}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 capitalize font-bold text-black">
                      Code staff:
                    </td>
                    <td className="px-4 py-1 text-black">{userInfo.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <ButtonIcon className="text-black hover:bg-neutral-600 hover:text-white duration-300" handleClick={handleChange}>
                <AiOutlineEdit />
              </ButtonIcon>
            </div>
          </div>
        </div>
      )}
      {isChange && (
        <div className="relative">
          <div className="fixed inset-0">
            <div>
              <div className="bg-black z-10 opacity-40 absolute inset-0"></div>
            </div>
            <div className="absolute inset-0 z-30 flex justify-center items-center">
              <div className="w-1/2 h-5/6 bg-white">
                <div>
                  <AiOutlineClose
                    onClick={() => setIsChange(!isChange)}
                    className=" float-right my-2 mr-3 cursor-pointer"
                  />
                </div>
                <div className="w-11/12  px-10 py-2 mx-auto my-5">
                  <h3 className="my-3 text-center text-2xl">Update Profile</h3>
                  <form onSubmit={submitEdit} className="space-y-5">
                    <InputText
                      title="Name"
                      type="text"
                      placeholder="Name"
                      value={profile.name}
                      className={``}
                      handleChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                    />
                    <div className="space-y-3">
                      <h3>Gender</h3>
                      <div className="grid grid-cols-2 w-11/12">
                        <div>
                          <input
                            type="radio"
                            checked={profile.gender === INITIAL_GENDER.Male}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                gender: INITIAL_GENDER[e.target.value],
                              })
                            }
                            value="Male"
                            name="gender"
                          />{" "}
                          Male
                        </div>
                        <div>
                          <input
                            type="radio"
                            checked={profile.gender === INITIAL_GENDER.Female}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                gender: INITIAL_GENDER[e.target.value],
                              })
                            }
                            value="Female"
                            name="gender"
                          />
                          Female
                        </div>
                      </div>
                    </div>
                    <InputText
                      title="Address"
                      type="text"
                      placeholder="address"
                      value={profile.address}
                      className={``}
                      handleChange={(e) =>
                        setProfile({ ...profile, address: e.target.value })
                      }
                    />
                    <div className="space-y-3">
                      <h3>Date of birthday</h3>
                      <input
                        className="w-full border border-slate-900 focus-visible:outline-none focus-visible:pl-1 py-1 placeholder-shown:pl-1 pl-1"
                        type="date"
                        value={profile.birthday}
                        onChange={(e) =>
                          setProfile({ ...profile, birthday: e.target.value })
                        }
                      />
                    </div>
                    <InputText
                      title="Number phone"
                      type="text"
                      placeholder="phone"
                      value={profile.phone}
                      className={``}
                      handleChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                    />
                    <div className="flex justify-center my-5">
                      <Button
                        children="Edit"
                        type="submit"
                        className="bg-indigo-700 py-1 px-2 rounded-md text-white"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
