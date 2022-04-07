export const STATUS = ["Open", "In Progress", "Closed"];
export const REQUEST_STATUS = { 1: "open", 2: "in progress", 3: "closed" };
export const INITIAL_STATUS = { open: 1, "in progress": 2, closed: 3 };
export const USER_ROLE = { 1: "admin", 2: "staff", 3: "manager" };
export const INITIAL_ROLE = { admin: 1, staff: 2, manager: 3 };
export const USER_GENDER = { 1: "male", 2: "female" };
export const INITIAL_GENDER = { male: 1, female: 2 };
export const DISPLAY_USER_ROLE = { 1: "admin", 2: "staff", 3: "manager" };
export const DISPLAY_STATUS = { 0: "enable", 1: "disable" };
export const USER_STATUS = { 0: "active", 1: "deactivate", 2: "pending" };
export const USER_STATUS_ACTIVE = 0;
export const COLOR_STATUS = {
  1: "bg-red-400 rounded-2xl",
  2: "bg-green-400 rounded-2xl",
  3: "bg-blue-400 rounded-2xl",
};
export const COLOR_USER_STATUS = {
  0: "bg-red-400 rounded-2xl",
  1: "bg-green-400 rounded-2xl",
  2: "bg-blue-400 rounded-2xl",
};
export const COLOR_APPROVE_MANAGER = {
  0: "bg-red-400 rounded-2xl",
  1: "bg-green-400 rounded-2xl",
  2: "bg-blue-400 rounded-2xl",
};
export const COLOR_DISPLAY_STATUS = {
  0: "bg-green-400 rounded-2xl",
  1: "bg-red-400 rounded-2xl",
};
export const INITIAL_APPROVE_MANAGER = {
  0: "pending",
  1: "approved",
  2: "reject",
};
export const APPROVE_MANAGER = { pending: 0, approved: 1, reject: 2 };
export const USER_STATUS_DEACTIVE = 1;
export const USER_STATUS_PENDING = 2;
export const PASSWORD_DEFAULT = "123456";
export const USER_ROLE_REQUEST = [
  {
    key: 1,
    value: "Admin",
  },
  {
    key: 2,
    value: "Staff",
  },
  {
    key: 3,
    value: "Manager",
  },
];
export const USER_STATUS_REQUEST = [
  {
    key: 0,
    value: "Active",
  },
  {
    key: 1,
    value: "Deactive",
  },
  {
    key: 2,
    value: "Pending",
  },
];

export const ADMIN_STATUS_REQUEST = [{
  key: 1,
  value: "Open"
},
{
  key: 2,
  value: "In Progress"
},
{
  key: 3,
  value: "Closed"
}
]

export const CATEGORY_STATUS = [{
  key: 0,
  value: "Enable"
},
{
  key: 1,
  value: "Disable"
}]
export const CATEGORY_STATUS_ENABLE=0;
export const CATEGORY_STATUS_DISABLE=1;
export const initialRole = { Admin: 1, Staff: 2, Manager: 3 };
export const CONVERT_REQUEST_STATUS = {1: "Open", 2: "In Progress", 3: "Closed"};