import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-option-config";
import type { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>();
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Facilities</h2>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
                {hotelFacilities.map((facility) => (
                    <label
                        key={facility}
                        className="text-sm flex items-center gap-1 text-gray-700"
                    >
                        <input
                            type="checkbox"
                            value={facility}
                            {...register("facilities", {
                                validate: (facilities) => {
                                    // 自定义 validator
                                    if (facilities && facilities.length > 0) {
                                        return true;
                                    } else {
                                        return "At least one facility is required!";
                                    }
                                },
                            })}
                        />
                        {facility}
                    </label>
                ))}
            </div>
            {errors.facilities && (
                <span className="text-red-500 font-normal text-sm">
                    {errors.facilities.message}
                </span>
            )}
        </div>
    );
};

export default FacilitiesSection;
